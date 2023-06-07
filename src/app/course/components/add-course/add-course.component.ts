import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseState } from '../../store';
import { Course } from '../../models/course.model';
import * as CourseActions from '../../store/course.actions';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  constructor(private store: Store<CourseState>) {}

  addCourse(course: Course) {
    this.store.dispatch(CourseActions.createCourse({ course }));
  }
}
