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
import * as lodash from 'lodash-es';

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
    {
      value: 'table',
      label: 'Table',
    },
  ];
  questionForm!: UntypedFormGroup;
  lessonId!: string;
  moduleId!: string;
  question?: Question;
  isEdit = false;

  ngOnInit() {
    this.lessonId = this.config.data.lessonId;
    this.moduleId = this.config.data.moduleId;
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
      ...(this.isEdit
        ? { _id: this.question?._id }
        : { _id: lodash.uniqueId('question-') }),
      type: value.type,
      config: value.config,
    };
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
        fa = this.question.config.options.map((o) =>
          this.fb.group(o as QuestionOptions)
        );
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
          moduleId: this.moduleId,
          options: this.fb.array(
            this.question?.config.options ?? [''],
            Validators.required
          ),
        })
      );
    }
    if (type === 'range') {
      const options = this.question?.config.options as any;
      this.questionForm.setControl(
        'config',
        this.fb.group({
          question: this.fb.control(questionValue, Validators.required),
          options: this.fb.group({
            stars: this.fb.control(options?.stars ?? 5),
            labels: this.fb.array(
              options?.labels ?? ['', ''],
              Validators.required
            ),
          }),
        })
      );
    }
    if (type === 'table') {
      let tableControls: any;
      if (this.question?.config.options) {
        const rows = this.question?.config.options as string[][];
        tableControls = rows.map((row: string[]) => this.fb.array(row));
      } else {
        tableControls = [this.fb.array([''])];
      }

      this.questionForm.setControl(
        'config',
        this.fb.group({
          question: this.fb.control(questionValue, Validators.required),
          options: this.fb.array(tableControls, Validators.required),
        })
      );
    }
  }
}
