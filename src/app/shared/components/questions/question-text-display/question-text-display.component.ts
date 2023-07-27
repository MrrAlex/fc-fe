import {Component, Input} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-question-text-display',
  templateUrl: './question-text-display.component.html',
  styleUrls: ['./question-text-display.component.scss']
})
export class QuestionTextDisplayComponent {

  @Input()
  readonly!: boolean;

  @Input()
  question!: UntypedFormGroup;

  get questionLabel() {
    return this.question.get('question') as UntypedFormControl;
  }

  get answer() {
    return this.question.get('answer') as UntypedFormControl;
  }
}
