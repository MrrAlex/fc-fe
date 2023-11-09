import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { LessonFacade } from '../../store/lesson';
import { AnswersFacade } from '../../store/answers';

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss'],
})
export class AnswerPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private lessonFacade: LessonFacade,
    private answersFacade: AnswersFacade
  ) {}

  lessonId!: string;

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['lessonId']) {
        this.lessonId = params['lessonId'];
      }
      if (this.lessonId) {
        this.lessonFacade.loadLesson(this.lessonId);
        this.answersFacade.loadAnswers(this.lessonId);
      }
    });

    setTimeout(() => {
      console.log(
        (document.getElementsByTagName('app-root')[0] as any)['offsetHeight']
      );
    }, 100);
  }
}
