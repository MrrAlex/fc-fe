import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, tap } from 'rxjs';
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
    this.route.queryParams
      .pipe(
        take(1),
        tap((params) => {
          if (params['lessonId']) {
            this.lessonId = params['lessonId'];
          }
        }),
        switchMap(() => this.auth.user$)
      )
      .subscribe((user) => {
        if (this.lessonId) {
          this.lessonFacade.loadLesson(this.lessonId);
          this.answersFacade.loadAnswers(this.lessonId, user);
        }
      });
  }
}
