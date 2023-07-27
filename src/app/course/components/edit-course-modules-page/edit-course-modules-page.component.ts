import { Component, OnInit } from '@angular/core';
import { CourseFacade } from '../../../store/course';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Course } from '../../../store/models/course.model';
import { LessonFacade } from '../../../store/lesson';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-course-modules-page',
  templateUrl: './edit-course-modules-page.component.html',
  styleUrls: ['./edit-course-modules-page.component.scss'],
})
export class EditCourseModulesPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseFacade: CourseFacade,
    private lessonFacade: LessonFacade,
    private location: Location
  ) {}

  courseId!: string;
  moduleId!: string;
  lessonId!: string;
  course?: Course;

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['courseId']) {
        this.courseFacade.loadCourse(params['courseId']);
        this.courseFacade
          .selectEntityById$(params['courseId'])
          .subscribe((course) => (this.course = course));
        this.courseId = params['courseId'];
      }
    });
    this.route.params.subscribe((params) => {
      if (params['lessonId']) {
        this.lessonId = params['lessonId'];
      }
      if (this.lessonId) {
        this.lessonFacade.loadLesson(this.lessonId);
      }
    });
  }

  back() {
    this.location.back();
  }
}
