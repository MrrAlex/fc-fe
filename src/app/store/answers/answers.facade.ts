import { Injectable } from '@angular/core';
import { Answer } from '../models/answer.model';
import { AnswerState } from './answers.reducer';
import { select, Store } from '@ngrx/store';

import * as AnswerActions from './answers.actions';
import {
  selectAnswersByLessonId,
  selectAnswersLoading,
} from './answers.selectors';
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AnswersFacade {
  constructor(private store: Store<AnswerState>, private auth: AuthService) {}

  loading$ = this.store.pipe(select(selectAnswersLoading));

  public selectAnswersByLesson(lessonId: string) {
    return this.store.pipe(select(selectAnswersByLessonId(lessonId)));
  }

  saveAnswers(answers: Answer[]) {
    this.store.dispatch(AnswerActions.saveAnswers({ answers, user: this.auth.currentUser }));
  }

  loadAnswers(lessonId: string, user: string) {
    this.store.dispatch(AnswerActions.loadAnswers({ lessonId, user }));
  }

  downloadCoursePdf(courseId: string) {
    this.store.dispatch(AnswerActions.loadCoursePdf({ courseId,  user: this.auth.currentUser }));
  }

  downloadModulePdf(moduleId: string) {
    this.store.dispatch(AnswerActions.loadModulePdf({ moduleId, user: this.auth.currentUser }));
  }
}
