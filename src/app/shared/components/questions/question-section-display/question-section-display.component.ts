import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-question-section-display',
  templateUrl: './question-section-display.component.html',
  styleUrls: ['./question-section-display.component.scss']
})
export class QuestionSectionDisplayComponent {
  @Input()
  sectionText!: string;
}
