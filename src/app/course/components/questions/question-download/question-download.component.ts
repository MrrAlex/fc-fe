import {Component, Input} from '@angular/core';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-question-download',
  templateUrl: './question-download.component.html',
  styleUrls: ['./question-download.component.scss']
})
export class QuestionDownloadComponent {
  constructor() {}

  @Input()
  form!: UntypedFormGroup;

  get questionName() {
    return this.form.get('question') as UntypedFormControl;
  }

  get options() {
    return (this.form.get('options') as UntypedFormArray).controls[0] as UntypedFormControl
  }
}
