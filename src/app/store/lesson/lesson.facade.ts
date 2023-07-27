import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as LessonActions from './lesson.actions';
import {
  selectById,
  selectLessonErrorMessage,
  selectLessonLoading,
  selectLessonSuccessMessage,
} from './lesson.selectors';
import { LessonState } from './lesson.reducer';
import { Question } from '../models/question.model';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonFacade {
  public loading$ = this.store.pipe(select(selectLessonLoading));
  public error$ = this.store.pipe(select(selectLessonErrorMessage),
    filter((v) => !!v)
  );
  public success$ = this.store.pipe(
    select(selectLessonSuccessMessage),
  );

  constructor(
    private readonly store: Store<LessonState>,
    private userService: AuthService
  ) {}

  public selectEntityById$(id: string) {
    return this.store.pipe(select(selectById(id)));
  }

  public loadLesson(id: string) {
    this.store.dispatch(LessonActions.loadLesson({ id }));
  }

  public addQuestionToLesson(id: string, question: Question) {
    this.store.dispatch(LessonActions.addQuestionToLesson({ id, question }));
  }

  public updateQuestionFroLession(id: string, question: Question) {
    this.store.dispatch(LessonActions.updateQuestionToLesson({ id, question }));
  }

  saveLesson(lessonId: string, questions: Question[]) {
    this.store.dispatch(
      LessonActions.assignQuestion({ id: lessonId, questions })
    );
  }

  clearErrorMessages() {
    this.store.dispatch(LessonActions.clearErrorMessage());
  }

  clearSuccessMessages() {
    this.store.dispatch(LessonActions.clearSuccessMessage());
  }
}
