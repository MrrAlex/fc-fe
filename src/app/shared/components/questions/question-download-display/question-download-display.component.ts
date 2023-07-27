import {Component, Input} from '@angular/core';
import {LessonFacade} from "../../../../store/lesson";

@Component({
  selector: 'app-question-download-display',
  templateUrl: './question-download-display.component.html',
  styleUrls: ['./question-download-display.component.scss']
})
export class QuestionDownloadDisplayComponent {
  constructor(private lessonFacade: LessonFacade) {

  }

  @Input()
  readonly!: boolean;

  @Input()
  sectionText!: string;

  @Input()
  isBlock!: boolean

  download() {
  }
}
