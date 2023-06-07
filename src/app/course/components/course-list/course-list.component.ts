import { Component, OnInit } from '@angular/core';
import { CourseFacade } from '../../store';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  constructor(private courseFacade: CourseFacade) {}

  loading$ = this.courseFacade.loading$;
  status = this.courseFacade.success$;
  courseList$ = this.courseFacade.coursesList$;

  courses!: Course[];

  ngOnInit() {
    this.courseFacade.loadCourses();

    this.courseList$.subscribe((courses) => (this.courses = courses));
  }
}
