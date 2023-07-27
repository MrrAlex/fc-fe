import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CourseState } from '../../../store/course';
import { Store } from '@ngrx/store';
import { LessonFacade } from '../../../store/lesson';
import { DialogService } from 'primeng/dynamicdialog';
import { AddQuestionModalComponent } from '../../../course/components/modals/add-question-modal/add-question-modal.component';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AnswersFacade } from '../../../store/answers';
import { Answer } from '../../../store/models/answer.model';
import { combineLatest, of } from 'rxjs';
import { cloneDeep } from 'lodash';
import { Question } from '../../../store/models/question.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-edit-course-questions-list',
  templateUrl: './edit-course-questions-list.component.html',
  styleUrls: ['./edit-course-questions-list.component.scss'],
})
export class EditCourseQuestionsListComponent implements OnInit {
  constructor(
    private store: Store<CourseState>,
    private lessonsFacade: LessonFacade,
    private answersFacade: AnswersFacade,
    private dialogService: DialogService,
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  questionsForm!: UntypedFormArray;

  @Input()
  readonly = true;

  _answers!: Answer[] | null;
  lesson!: string;
  lessonName!: string;
  questions!: Question[];

  @Input()
  set lessonId(id: string) {
    if (id) {
      const obs = combineLatest([
        this.lessonsFacade.selectEntityById$(id),
        this.readonly ? of(null) : this.answersFacade.selectAnswersByLesson(id),
      ]);
      obs.subscribe(([lesson, answers]) => {
        this.questions = cloneDeep(lesson?.questions) as Question[];
        this._answers = answers;
        this.lessonName = lesson?.name as string;
        this.lesson = lesson?._id as string;
        if (lesson) {
          this.questionsForm = this.createForm(
            this.questions,
            this._answers,
            this.readonly
          );
          this.questionsForm.valueChanges.subscribe(console.log);
        }
      });
    }
  }

  ngOnInit() {}

  groupByIndex(questionId?: string) {
    const questionIndex = this.questions.findIndex((q) => q._id === questionId);
    return this.questionsForm.controls[questionIndex] as UntypedFormGroup;
  }

  addQuestionModal(question?: Question) {
    this.dialogService.open(AddQuestionModalComponent, {
      header: !!question ? 'Edit Question' : 'Add Question',
      data: {
        lessonId: this.lesson,
        question,
      },
      styleClass: 'w-full lg:w-6',
    });
  }

  saveLesson() {
    this.lessonsFacade.saveLesson(this.lesson, this.questions);
  }

  saveAnswer() {
    const answers = this.questionsForm.value
      .filter((val: any) => val)
      .map((val: any) => {
        const answer = this._answers?.find(
          (ans: any) => ans.questionId === val?.questionId
        );
        return {
          answer: Array.isArray(val.answer) ? val.answer : [val.answer],
          questionId: val.questionId,
          lessonId: this.lessonId,
          ...(answer ? { _id: answer._id } : {}),
        };
      });
    this.answersFacade.saveAnswers(answers);
  }

  reorder() {
    this.questionsForm = this.createForm(
      this.questions,
      this._answers,
      this.readonly
    );
  }

  private createForm(
    questions: Question[],
    answers: Answer[] | null,
    readonly: boolean
  ) {
    return this.fb.array(
      questions.map((question) => {
        const answer = answers?.find(
          (answer) => answer.questionId === question._id
        );
        if (question.type === 'text') {
          return this.fb.group({
            question: question.config.question,
            questionId: question._id,
            answer: this.fb.control(
              { value: answer?.answer ?? '', disabled: readonly },
              Validators.required
            ),
          });
        }
        if (
          question.type === 'radio' ||
          question.type === 'checkbox' ||
          question.type === 'range'
        ) {
          return this.fb.group({
            question: question.config.question,
            questionId: question._id,
            options: this.fb.control(question.config.options),
            answer: this.fb.control(
              { value: answer?.answer ?? '', disabled: readonly },
              Validators.required
            ),
          });
        }
        return null;
      })
    );
  }

  savePresent() {
    return this.questions.some(
      (q) => q.type !== 'download' && q.type !== 'textSection'
    );
  }

  deleteQuestion(question: Question) {
    this.confirmationService.confirm({
      header: 'Delete question',
      message: 'Are you sure that you want to delete question?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const index = this.questions.findIndex((q) => q._id === question._id);
        this.questions = this.questions.filter((q) => q._id !== question._id);
        this.questionsForm.removeAt(index);
      },
    });
  }
}
