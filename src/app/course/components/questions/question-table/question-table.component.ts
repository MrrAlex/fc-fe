import {Component, Input, OnInit} from '@angular/core';
import {
  FormArray,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {range} from "lodash";

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss'],
})
export class QuestionTableComponent implements OnInit{
  @Input()
  form!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.colNumber = this.form.value.options[0].length;
    this.rowNumber = this.form.value.options.length;
  }

  colNumber = 1;
  rowNumber = 1;

  get questionName() {
    return this.form.get('question') as UntypedFormControl;
  }

  get options() {
    return this.form.get('options') as UntypedFormArray;
  }

  get rows() {
    return this.options.controls as FormArray[];
  }

  cols(rowControls: FormArray): UntypedFormControl[] {
    return rowControls.controls as UntypedFormControl[];
  }

  addNewRow() {
    this.rowNumber += 1;
    this.options.push(this.fb.array(Array(this.colNumber).fill('')));
  }

  deleteRow(i: number) {
    this.rowNumber -= 1;
    this.options.removeAt(i);
  }

  addNewColumn() {
    this.colNumber += 1;
    const controls: UntypedFormArray[] = this.options
      .controls as UntypedFormArray[];
    for (let control of controls) {
      control.push(this.fb.control(''));
    }
  }

  deleteColumn(i: number) {
    this.colNumber -= 1;
    const controls: UntypedFormArray[] = this.options
      .controls as UntypedFormArray[];
    for (let control of controls) {
      control.removeAt(i);
    }
  }

  protected readonly range = range;
}
