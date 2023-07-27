import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseFacade, CourseState } from '../../../store/course';
import { Course } from '../../../store/models/course.model';
import * as CourseActions from '../../../store/course/course.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  constructor(
    private courseFacade: CourseFacade,
    private route: ActivatedRoute
  ) {}

  course$!: Observable<Course | undefined>;
  editMode = false;
  id = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.courseFacade.loadCourse(params['id']);
        this.course$ = this.courseFacade.selectEntityById$(params['id']);
        this.course$.subscribe(console.log)
        this.editMode = true;
        this.id = params['id'];
      }
    });
  }

  addCourse(course: Course) {
    if (this.editMode) {
      this.courseFacade.updateCourse(course, this.id);
    } else {
      this.courseFacade.createCourse(course);
    }
  }
}
