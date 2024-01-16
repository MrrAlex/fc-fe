import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
import { cloneDeep } from 'lodash-es';
import { Question } from '../../../store/models/question.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-edit-course-questions-list',
  templateUrl: './edit-course-questions-list.component.html',
  styleUrls: ['./edit-course-questions-list.component.scss'],
})
export class EditCourseQuestionsListComponent {
  constructor(
    private lessonsFacade: LessonFacade,
    private answersFacade: AnswersFacade,
    private dialogService: DialogService,
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  questionsForm!: UntypedFormArray;

  @Input()
  moduleId!: string;

  @Input()
  readonly = true;

  _answers!: Answer[] | null;
  lesson!: string;
  course?: string;
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
        this.course = lesson?.course;
        if (lesson) {
          this.questionsForm = this.createForm(
            this.questions,
            this._answers,
            this.readonly
          );

          this.sendContainerHeightToParent();
        }
      });
    }
  }

  private sendContainerHeightToParent() {
    const interval = setInterval(() => {
      const height = (document.getElementsByTagName('app-root')[0] as any)[
        'offsetHeight'
      ];
      if (height > 0) {
        window.parent.postMessage(
          `${this.lesson}||${height}`,
          'http://finuchenie.online'
        );
        clearInterval(interval);
      }
    }, 100);
  }

  groupByIndex(questionId?: string) {
    const questionIndex = this.questions.findIndex((q) => q._id === questionId);
    return this.questionsForm.controls[questionIndex] as UntypedFormGroup;
  }

  addQuestionModal(question?: Question) {
    const ref = this.dialogService.open(AddQuestionModalComponent, {
      header: !!question ? 'Edit Question' : 'Add Question',
      data: {
        lessonId: this.lesson,
        moduleId: this.moduleId,
        question,
      },
      styleClass: 'w-full lg:w-6',
    });

    ref.onClose.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  saveLesson() {
    this.lessonsFacade.saveLesson(this.lesson, this.questions);
  }

  saveAnswer() {
    const answers = this.questionsForm
      .getRawValue()
      .filter((val: any) => val)
      .map((val: any) => {
        const answer = this._answers?.find(
          (ans: any) => ans.questionId === val?.questionId
        );
        return {
          answer: Array.isArray(val.answer) ? val.answer : [val.answer],
          questionId: val.questionId,
          lessonId: this.lesson,
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

        if (question.type === 'table') {
          const options = question.config.options as string[][];
          const answerValue = answer?.answer as string[][];
          return this.fb.group({
            question: question.config.question,
            questionId: question._id,
            options: this.fb.control(options),
            answer: this.fb.array(
              options.map((co, i) => {
                const arr = this.fb.array(answerValue ? answerValue[i] : co);
                if (readonly) {
                  arr.controls.forEach((c) => c.disable());
                } else {
                  arr.controls.forEach((c, j) => {
                    if (options[i][j]) {
                      c.disable();
                    }
                  });
                }

                return arr;
              })
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

  downloadPdf(isBlock: boolean, moduleId?: string) {
    if (isBlock) {
      this.answersFacade.downloadModulePdf(moduleId as string);
    } else {
      this.answersFacade.downloadCoursePdf(this.course as string);
    }
  }
}
