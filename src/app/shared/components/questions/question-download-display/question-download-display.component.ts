import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-question-download-display',
  templateUrl: './question-download-display.component.html',
  styleUrls: ['./question-download-display.component.scss']
})
export class QuestionDownloadDisplayComponent {
  constructor() {}

  @Input()
  readonly!: boolean;

  @Input()
  sectionText!: string;

  @Input()
  isBlock!: boolean

  @Output()
  downloadFile = new EventEmitter<boolean>();

  download() {
    this.downloadFile.emit(this.isBlock)
  }
}
