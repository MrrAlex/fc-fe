import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {QuestionOptions} from "../../../../store/models/question.model";

@Component({
  selector: 'app-question-radio-display',
  templateUrl: './question-radio-display.component.html',
  styleUrls: ['./question-radio-display.component.scss']
})
export class QuestionRadioDisplayComponent{
  @Input()
  readonly!: boolean;

  @Input()
  question!: UntypedFormGroup;

  get questionLabel() {
    return this.question.get('question') as UntypedFormControl;
  }

  get options(): QuestionOptions[] {
    return this.question.get('options')?.value;
  }

  get answer() {
    return this.question.get('answer') as UntypedFormControl;
  }
}
