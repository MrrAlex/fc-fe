import {Component, Input} from '@angular/core';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {QuestionOptions} from "../../../../store/models/question.model";

@Component({
  selector: 'app-question-table-display',
  templateUrl: './question-table-display.component.html',
  styleUrls: ['./question-table-display.component.scss']
})
export class QuestionTableDisplayComponent {
  @Input()
  readonly!: boolean;

  @Input()
  question!: UntypedFormGroup;

  get questionLabel() {
    return this.question.get('question') as UntypedFormControl;
  }

  get options(): string[][] {
    return this.question?.get('options')?.value as string[][];
  }

  get answer(): UntypedFormArray[] {
    return (this.question.get('answer') as UntypedFormArray)?.controls as UntypedFormArray[];
  }

  answerItem(answerArray: UntypedFormArray): UntypedFormControl[] {
    return answerArray.controls as UntypedFormControl[];
  }
}
