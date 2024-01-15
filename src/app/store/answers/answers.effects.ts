import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AnswerActions from './answers.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AnswersService } from '../services/answers.service';

@Injectable()
export class AnswersEffects {
  constructor(
    private actions$: Actions,
    private answersService: AnswersService
  ) {}

  saveAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.saveAnswers),
      switchMap(({ answers, user }) =>
        this.answersService.saveAnswers(answers, user).pipe(
          map((updated) =>
            AnswerActions.saveAnswersSuccess({ answers: updated })
          ),
          catchError(() => of(AnswerActions.saveAnswersFailed()))
        )
      )
    )
  );

  loadAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.loadAnswers),
      switchMap(({ lessonId, user }) =>
        this.answersService.loadAnswers(lessonId, user).pipe(
          map((updated) =>
            AnswerActions.loadAnswersSuccess({ answers: updated })
          ),
          catchError(() => of(AnswerActions.loadAnswersFailed()))
        )
      )
    )
  );

  loadModulePfd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.loadModulePdf),
      switchMap(({ moduleId, user }) =>
        this.answersService.loadPdfWithAnswers(user, moduleId).pipe(
          map((pdf) => AnswerActions.loadPdfSuccess({ pdf })),
          catchError(() => of(AnswerActions.loadPdfFailed()))
        )
      )
    )
  );

  loadCoursePdf = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.loadCoursePdf),
      switchMap(({ courseId, user }) =>
        this.answersService.loadPdfWithAnswers(user, undefined, courseId).pipe(
          map((pdf) => AnswerActions.loadPdfSuccess({ pdf })),
          catchError(() => of(AnswerActions.loadPdfFailed()))
        )
      )
    )
  );
}
