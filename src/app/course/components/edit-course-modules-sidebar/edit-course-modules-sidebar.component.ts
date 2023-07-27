import { Component, Input, OnInit } from '@angular/core';
import { StudyModule } from '../../../store/models/study-module.model';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddLessonModalComponent } from '../modals/add-lesson-modal/add-lesson-modal.component';
import { AddModuleModalComponent } from '../modals/add-module-modal/add-module-modal.component';
import { Lesson } from '../../../store/models/lesson.model';

@Component({
  selector: 'app-edit-course-modules-sidebar',
  templateUrl: './edit-course-modules-sidebar.component.html',
  styleUrls: ['./edit-course-modules-sidebar.component.scss'],
})
export class EditCourseModulesSidebarComponent {
  constructor(private dialogService: DialogService) {}

  lessonLink(module: StudyModule, lesson: Lesson) {
    return `/courses/${this.courseId}/modules/${module._id}/lessons/${lesson._id}`
  }

  @Input()
  courseId!: string;

  @Input()
  modules!: StudyModule[] | undefined;

  menuItems!: MenuItem[];

  openAddLessonModal(e: Event, module: StudyModule, lesson?: Lesson) {
    e.stopPropagation();
    this.dialogService.open(AddLessonModalComponent, {
      data: {
        courseId: this.courseId,
        moduleId: module._id,
        lesson,
      },
      header: !!lesson ? 'Edit Lesson' : 'Add Lesson',
      styleClass: 'w-full lg:w-6',
    });
  }

  openAddModuleModal(e: Event, module?: StudyModule) {
    e.stopPropagation();
    this.dialogService.open(AddModuleModalComponent, {
      data: {
        courseId: this.courseId,
        module
      },
      header: !!module ? 'Edit module' : 'Add module',
      styleClass: 'w-full lg:w-6',
    });
  }
}
