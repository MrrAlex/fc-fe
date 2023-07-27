import { Injectable } from '@angular/core';
import { CourseState } from './course.reducer';
import { select, Store } from '@ngrx/store';
import {
  selectById,
  selectCourseLoading,
  selectCourses,
  selectErrorMessage,
  selectSuccessMessage,
} from './course.selectors';
import * as CourseActions from './course.actions';
import { StudyModule } from '../models/study-module.model';
import { Lesson } from '../models/lesson.model';
import { filter } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseFacade {
  public loading$ = this.store.pipe(select(selectCourseLoading));
  public success$ = this.store.pipe(
    select(selectSuccessMessage),
  );
  public error$ = this.store.pipe(
    select(selectErrorMessage),
  );
  public coursesList$ = this.store.pipe(select(selectCourses));

  constructor(private readonly store: Store<CourseState>) {}

  public selectEntityById$(id: string) {
    return this.store.pipe(select(selectById(id)));
  }

  public loadCourses() {
    this.store.dispatch(CourseActions.loadCourses());
  }

  public updateModule(module: StudyModule, courseId: string) {
    this.store.dispatch(CourseActions.updateModule({ module, courseId }));
  }
  public createModule(module: StudyModule, courseId: string) {
    this.store.dispatch(CourseActions.createModule({ module, courseId }));
  }

  public updateLessonForModule(
    lesson: Lesson,
    courseId: string,
    moduleId: string
  ) {
    this.store.dispatch(
      CourseActions.updateLesson({ lesson, courseId, moduleId })
    );
  }
  public createLessonForModule(
    lesson: Lesson,
    courseId: string,
    moduleId: string
  ) {
    this.store.dispatch(
      CourseActions.createLesson({ lesson, courseId, moduleId })
    );
  }

  loadCourse(id: string) {
    this.store.dispatch(CourseActions.loadCourse({ id }));
  }

  createCourse(course: Course) {
    this.store.dispatch(CourseActions.createCourse({ course }));
  }

  updateCourse(course: Course, id: string) {
    this.store.dispatch(CourseActions.updateCourse({ course, id }));
  }

  clearErrorMessages() {
    this.store.dispatch(CourseActions.clearErrorMessage());
  }

  clearSuccessMessages() {
    this.store.dispatch(CourseActions.clearSuccessMessage());
  }
}
