import {Component, Input} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {QuestionOptions} from "../../../../store/models/question.model";

@Component({
  selector: 'app-question-checkbox-display',
  templateUrl: './question-checkbox-display.component.html',
  styleUrls: ['./question-checkbox-display.component.scss']
})
export class QuestionCheckboxDisplayComponent {
  @Input()
  readonly!: boolean;

  @Input()
  question!: UntypedFormGroup;

  get questionLabel() {
    return this.question.get('question')?.value;
  }

  get options(): QuestionOptions[] {
    return this.question.get('options')?.value;
  }

  get answer() {
    return this.question.get('answer') as UntypedFormControl;
  }
}
