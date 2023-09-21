import {Component, Input} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {QuestionOptions} from "../../../../store/models/question.model";

@Component({
  selector: 'app-question-range-display',
  templateUrl: './question-range-display.component.html',
  styleUrls: ['./question-range-display.component.scss']
})
export class QuestionRangeDisplayComponent {

  @Input()
  readonly!: boolean;

  @Input()
  question!: UntypedFormGroup;

  get questionLabel() {
    return this.question.get('question') as UntypedFormControl;
  }

  get options(): any {
    return this.question.get('options')?.value;
  }

  get answer() {
    return this.question.get('answer') as UntypedFormControl;
  }
}
