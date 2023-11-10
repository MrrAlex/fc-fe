import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { LessonFacade } from '../../store/lesson';
import { AnswersFacade } from '../../store/answers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss'],
})
export class AnswerPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private lessonFacade: LessonFacade,
    private answersFacade: AnswersFacade,
    private auth: AuthService
  ) {}

  lessonId!: string;

  ngOnInit() {
    forkJoin([this.route.queryParams.pipe(take(1)), this.auth.user$]).subscribe(
      ([params, user]) => {
        if (params['lessonId']) {
          this.lessonId = params['lessonId'];
        }
        if (this.lessonId) {
          this.lessonFacade.loadLesson(this.lessonId);
          this.answersFacade.loadAnswers(this.lessonId, user);
        }
      }
    );
  }
}
