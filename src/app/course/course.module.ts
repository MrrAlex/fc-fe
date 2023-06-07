import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StoreModule } from '@ngrx/store';
import { CourseFacade, coursesReducer, MoviesEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";

const routes: Routes = [
  {
    path: 'list',
    component: CourseListComponent,
  },
  {
    path: 'add',
    component: AddCourseComponent,
  },
  {
    path: ':id/edit',
    component: AddCourseComponent,
  },
  {
    path: ':id',
    component: ViewCourseComponent,
  },
];

@NgModule({
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    ViewCourseComponent,
    AddCourseFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature(MoviesEffects),
    TableModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
  ],
  providers: [CourseFacade],
})
export class CourseModule {}
