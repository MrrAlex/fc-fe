import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Lesson } from '../../../../store/models/lesson.model';

import * as CourseActions from '../../../../store/course/course.actions';
import { CourseFacade } from '../../../../store/course';

@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.component.html',
  styleUrls: ['./add-lesson-modal.component.scss'],
})
export class AddLessonModalComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private courseFacade: CourseFacade
  ) {}

  lessonForm!: UntypedFormGroup;
  lesson!: Lesson;
  isEdit = false;
  courseId!: string;
  moduleId!: string;

  ngOnInit() {
    this.lesson = this.config.data.lesson;
    this.courseId = this.config.data.courseId;
    this.moduleId = this.config.data.moduleId;
    this.isEdit = !!this.lesson;
    this.lessonForm = this.fb.group({
      name: this.fb.control(this.lesson?.name ?? '', {
        validators: Validators.required,
      }),
    });
  }

  get name(): UntypedFormControl {
    return this.lessonForm.get('name') as UntypedFormControl;
  }

  closeModal(): void {
    this.ref.close();
  }

  goSave(): void {
    const lesson: Lesson = this.isEdit
      ? { ...this.lesson, ...this.lessonForm.value }
      : this.lessonForm.value;

    if (this.isEdit) {
      this.courseFacade.updateLessonForModule(
        lesson,
        this.courseId,
        this.moduleId
      );
    } else {
      this.courseFacade.createLessonForModule(
        lesson,
        this.courseId,
        this.moduleId
      );
    }
    this.ref.close();
  }
}
