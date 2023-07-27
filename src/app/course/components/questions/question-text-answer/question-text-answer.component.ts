import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-text-answer',
  templateUrl: './question-text-answer.component.html',
  styleUrls: ['./question-text-answer.component.scss'],
})
export class QuestionTextAnswerComponent {
  constructor() {}

  @Input()
  form!: UntypedFormGroup;

  get questionName() {
    return this.form.get('question') as UntypedFormControl;
  }
}
