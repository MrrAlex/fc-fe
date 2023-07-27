import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  Question,
  QuestionOptions,
} from '../../../../store/models/question.model';
import { LessonFacade } from '../../../../store/lesson';
import * as lodash from 'lodash'

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss'],
})
export class AddQuestionModalComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private lessonFacade: LessonFacade
  ) {}

  types = [
    {
      value: 'checkbox',
      label: 'Multiple answers',
    },
    {
      value: 'radio',
      label: 'Single answer',
    },
    {
      value: 'text',
      label: 'Text question',
    },
    {
      value: 'textSection',
      label: 'Section',
    },
    {
      value: 'download',
      label: 'Download Button',
    },
    {
      value: 'range',
      label: 'Range',
    },
  ];
  questionForm!: UntypedFormGroup;
  lessonId!: string;
  question?: Question;
  isEdit = false;

  ngOnInit() {
    this.lessonId = this.config.data.lessonId;
    this.question = this.config.data.question;
    this.isEdit = !!this.question;

    this.questionForm = this.fb.group({
      type: this.fb.control(this.question?.type ?? '', Validators.required),
      config: null,
    });
    if (this.isEdit) {
      this.checkForType(this.question?.type as string);
    }
    this.type.valueChanges.subscribe((type) => this.checkForType(type));
  }

  get questionConfig() {
    return this.questionForm.get('config') as UntypedFormGroup;
  }

  get type() {
    return this.questionForm.get('type') as UntypedFormControl;
  }

  goSave() {
    const value = this.questionForm.value;
    const question: Question = {
      ...(this.isEdit ? { _id: this.question?._id } : {_id: lodash.uniqueId('question-')}),
      type: value.type,
      config: value.config,
    };
    console.log(value, question);
    if (this.isEdit) {
      this.lessonFacade.updateQuestionFroLession(this.lessonId, question);
    } else {
      this.lessonFacade.addQuestionToLesson(this.lessonId, question);
    }

    this.closeModal();
  }

  closeModal(): void {
    this.ref.close();
  }

  private checkForType(type: string) {
    const questionValue = this.question?.config.question ?? '';
    if (type === 'text' || type === 'textSection') {
      this.questionForm.setControl(
        'config',
        this.fb.group({
          question: this.fb.control(questionValue, Validators.required),
        })
      );
    }
    if (type === 'checkbox' || type === 'radio') {
      let fa: UntypedFormGroup[] = [];
      if (this.question) {
        fa = this.question.config.options.map((o) => this.fb.group(o as QuestionOptions));
      }
      this.questionForm.setControl(
        'config',
        this.fb.group({
          question: this.fb.control(questionValue, Validators.required),
          options: this.fb.array(fa, Validators.required),
        })
      );
    }
    if (type === 'download') {
      this.questionForm.setControl(
        'config',
        this.fb.group({
          question: this.fb.control(questionValue, Validators.required),
          options: this.fb.array(
            this.question?.config.options ?? [''],
            Validators.required
          ),
        })
      );
    }
    if (type === 'range') {
      this.questionForm.setControl(
        'config',
        this.fb.group({
          question: this.fb.control(questionValue, Validators.required),
          options: this.fb.array(
            this.question?.config.options ?? ['', ''],
            Validators.required
          ),
        })
      );
    }
  }
}
