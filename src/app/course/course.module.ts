import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CourseListComponent} from './components/course-list/course-list.component';
import {AddCourseComponent} from './components/add-course/add-course.component';
import {ViewCourseComponent} from './components/view-course/view-course.component';
import {AddCourseFormComponent} from './components/add-course-form/add-course-form.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import {EditCourseModulesPageComponent} from './components/edit-course-modules-page/edit-course-modules-page.component';
import {
  EditCourseModulesSidebarComponent
} from './components/edit-course-modules-sidebar/edit-course-modules-sidebar.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {AddLessonModalComponent} from './components/modals/add-lesson-modal/add-lesson-modal.component';
import {DialogService} from 'primeng/dynamicdialog';
import {AddModuleModalComponent} from './components/modals/add-module-modal/add-module-modal.component';
import {QuestionTextAnswerComponent} from './components/questions/question-text-answer/question-text-answer.component';
import {
  QuestionMultipleAnswersComponent
} from './components/questions/question-multiple-answers/question-multiple-answers.component';
import {AddQuestionModalComponent} from './components/modals/add-question-modal/add-question-modal.component';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {AccordionModule} from 'primeng/accordion';
import {SharedModule} from '../shared/shared.module';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {
  QuestionRangeAnswerComponent
} from './components/questions/question-range-answer/question-range-answer.component';
import {QuestionDownloadComponent} from './components/questions/question-download/question-download.component';
import {CourseFacade} from '../store/course';
import {AppStoreModule} from '../store/store.module';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
    data: {
      sidebar: true,
    },
  },
  {
    path: 'course',
    component: AddCourseComponent,
  },
  {
    path: 'modules',
    component: EditCourseModulesPageComponent,
  },
];

@NgModule({
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    ViewCourseComponent,
    AddCourseFormComponent,
    EditCourseModulesPageComponent,
    EditCourseModulesSidebarComponent,
    AddLessonModalComponent,
    AddModuleModalComponent,
    QuestionTextAnswerComponent,
    QuestionMultipleAnswersComponent,
    AddQuestionModalComponent,
    QuestionRangeAnswerComponent,
    QuestionDownloadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    EditorModule,
    FormsModule,
    PanelMenuModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    AccordionModule,
    SharedModule,
    PanelModule,
    CardModule,
    AppStoreModule,
  ],
  providers: [DialogService, CourseFacade],
  exports: [QuestionDownloadComponent, QuestionRangeAnswerComponent],
})
export class CourseModule {}
