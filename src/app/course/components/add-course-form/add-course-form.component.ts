import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from '../../models/course.model';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss'],
})
export class AddCourseFormComponent implements OnInit {
  @Output()
  addCourse = new EventEmitter<Course>();

  courseForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: this.fb.control('', { validators: Validators.required }),
      description: this.fb.control('', { validators: Validators.required }),
    });
  }

  get name(): UntypedFormControl {
    return this.courseForm.get('name') as UntypedFormControl;
  }

  get description(): UntypedFormControl {
    return this.courseForm.get('description') as UntypedFormControl;
  }

  submit() {
    this.addCourse.emit(this.courseForm.value as Course);
  }
}
