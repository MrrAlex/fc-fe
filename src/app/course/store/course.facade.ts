import { Injectable } from '@angular/core';
import { CourseState } from './course.reducer';
import { select, Store } from '@ngrx/store';
import {
  selectById,
  selectCourseLoading,
  selectCourses,
  selectCourseStatus,
} from './course.selectors';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseFacade {
  public loading$ = this.store.pipe(select(selectCourseLoading));
  public success$ = this.store.pipe(select(selectCourseStatus));
  public coursesList$ = this.store.pipe(select(selectCourses));

  constructor(private readonly store: Store<CourseState>) {}

  public selectEntityById$(id: string) {
    return this.store.pipe(select(selectById(id)));
  }

  public loadCourses() {
    this.store.dispatch(CourseActions.loadCourses());
  }
}
