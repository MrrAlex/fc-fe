import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudyModule } from '../../../../store/models/study-module.model';
import { CourseFacade } from '../../../../store/course';

@Component({
  selector: 'app-add-module-modal',
  templateUrl: './add-module-modal.component.html',
  styleUrls: ['./add-module-modal.component.scss'],
})
export class AddModuleModalComponent {
  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private courseFacade: CourseFacade
  ) {}

  moduleForm!: UntypedFormGroup;
  module!: StudyModule;
  isEdit = false;
  courseId!: string;

  ngOnInit() {
    this.module = this.config.data.module;
    this.courseId = this.config.data.courseId;
    this.isEdit = !!this.module;
    this.moduleForm = this.fb.group({
      name: this.fb.control(this.module?.name ?? '', {
        validators: Validators.required,
      }),
    });
  }

  get name(): UntypedFormControl {
    return this.moduleForm.get('name') as UntypedFormControl;
  }

  closeModal(): void {
    this.ref.close();
  }

  goSave(): void {
    const module: StudyModule = this.isEdit
      ? { ...this.module, ...this.moduleForm.value }
      : this.moduleForm.value;

    if (this.isEdit) {
      this.courseFacade.updateModule(module, this.courseId);
    } else {
      this.courseFacade.createModule(module, this.courseId);
    }
    this.ref.close();
  }
}
