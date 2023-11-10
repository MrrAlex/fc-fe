import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs';
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
  userId!: string;

  ngOnInit() {
    this.auth.user$
      .pipe(
        filter((user) => !!user),
        tap((user) => (this.userId = user)),
        switchMap(() => this.route.queryParams.pipe(take(1)))
      )
      .subscribe((params) => {
        if (params['lessonId']) {
          this.lessonId = params['lessonId'];
        }
        if (this.lessonId) {
          this.lessonFacade.loadLesson(this.lessonId);
          this.answersFacade.loadAnswers(this.lessonId, this.userId);
        }
      });
  }
}
