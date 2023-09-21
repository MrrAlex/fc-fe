import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-question-range-answer',
  templateUrl: './question-range-answer.component.html',
  styleUrls: ['./question-range-answer.component.scss'],
})
export class QuestionRangeAnswerComponent {
  constructor() {}

  @Input()
  form!: UntypedFormGroup;

  get questionName() {
    return this.form.get('question') as UntypedFormControl;
  }

  get options() {
    return this.form.get('options') as UntypedFormGroup;
  }

  get labels() {
    return this.options.get('labels') as UntypedFormArray;
  }

  get stars(): UntypedFormControl {
    return this.options.get('stars') as UntypedFormControl;
  }

  getMinLabelControl() {
    return this.labels.controls[0] as UntypedFormControl;
  }

  getMaxLabelControl() {
    return this.labels.controls[1] as UntypedFormControl;
  }
}
