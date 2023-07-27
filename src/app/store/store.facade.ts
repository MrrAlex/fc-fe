import { Injectable } from '@angular/core';
import { LessonFacade } from './lesson';
import { AnswersFacade } from './answers';
import { CourseFacade } from './course';
import { combineLatest, debounceTime, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreFacade {
  constructor(
    private lessons: LessonFacade,
    private answers: AnswersFacade,
    private courses: CourseFacade
  ) {}

  loading$ = combineLatest([
    this.lessons.loading$,
    this.answers.loading$,
    this.courses.loading$,
  ]).pipe(
    map(([l1, l2, l3]) => l1 || l2 || l3),
    debounceTime(0)
  );

  errorMessage = combineLatest([this.lessons.error$, this.courses.error$]).pipe(
    map(([e1, e2]) => {
      if (e1) {
        return e1;
      }
      if (e2) {
        return e2;
      }

      return '';
    }),
    tap(() => this.clearErrorMessages())
  );

  successMessages = combineLatest([
    this.lessons.success$,
    this.courses.success$,
  ]).pipe(
    map(([e1, e2]) => {
      if (e1) {
        return e1;
      }
      if (e2) {
        return e2;
      }

      return '';
    }),
    tap(() => this.clearSuccessMessages())
  );

  clearSuccessMessages() {
    this.courses.clearSuccessMessages();
    this.lessons.clearSuccessMessages();
  }

  clearErrorMessages() {
    this.courses.clearErrorMessages();
    this.lessons.clearErrorMessages();
  }
}
