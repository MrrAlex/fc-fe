import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CourseFacade} from '../../../store/course';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs';
import {Course} from '../../../store/models/course.model';
import {LessonFacade} from '../../../store/lesson';
import {Location} from '@angular/common';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-course-modules-page',
  templateUrl: './edit-course-modules-page.component.html',
  styleUrls: ['./edit-course-modules-page.component.scss'],
})
export class EditCourseModulesPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseFacade: CourseFacade,
    private lessonFacade: LessonFacade,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  courseId!: string;
  moduleId!: string;
  lessonId!: string;
  course?: Course;
  selectedLesson!: number[];

  ngOnInit() {
    this.route.queryParams
      .pipe(
        tap((params) => {
          if (params['moduleId']) {
            this.moduleId = params['moduleId'];
          }
          if (params['lessonId']) {
            this.lessonId = params['lessonId'];
            this.lessonFacade.loadLesson(this.lessonId);
          }
          if (params['courseId']) {
            this.courseId = params['courseId'];
            this.courseFacade.loadCourse(params['courseId']);
          }
        }),
        switchMap(() => this.courseFacade.selectEntityById$(this.courseId))
      )
      .subscribe((course) => {
        this.course = course;
        if (this.course && this.moduleId) {
          const index = this.course?.modules.findIndex((m) => m._id === this.moduleId)
          if (!this.selectedLesson?.includes(index)) {
            this.selectedLesson = [index] ?? [-1];
          }
        }
        this.cdr.markForCheck();
      });
  }

  back() {
    this.location.back();
  }
}
