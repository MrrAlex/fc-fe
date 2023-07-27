import { Component, OnInit } from '@angular/core';
import { CourseFacade } from '../../../store/course';
import { Course } from '../../../store/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  constructor(private courseFacade: CourseFacade) {}

  courseList$ = this.courseFacade.coursesList$;

  courses!: Course[];

  ngOnInit() {
    this.courseFacade.loadCourses();
    this.courseList$.subscribe((courses) => {
      this.courses = courses;
    });
  }
}
