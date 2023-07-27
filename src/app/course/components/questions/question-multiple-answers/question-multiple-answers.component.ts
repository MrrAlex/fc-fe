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
  selector: 'app-question-multiple-answers',
  templateUrl: './question-multiple-answers.component.html',
  styleUrls: ['./question-multiple-answers.component.scss'],
})
export class QuestionMultipleAnswersComponent {
  constructor(private fb: UntypedFormBuilder) {}

  @Input()
  form!: UntypedFormGroup;

  get questionName() {
    return this.form.get('question') as UntypedFormControl;
  }

  get options() {
    return this.form.get('options') as UntypedFormArray;
  }

  getQuestionLabelControl(control: AbstractControl) {
    return control.get('label') as UntypedFormControl
  }

  addOption() {
    this.options.push(
      this.fb.group({
        value: `option${this.options.controls.length}`,
        label: this.fb.control('', Validators.required),
      })
    );
  }
}
