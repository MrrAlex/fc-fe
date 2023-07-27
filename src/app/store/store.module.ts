import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonEffects, lessonsReducer } from './lesson';
import { AnswersEffects, answersReducer } from './answers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CourseEffects, coursesReducer } from './course';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('lessons', lessonsReducer),
    StoreModule.forFeature('answers', answersReducer),
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature(LessonEffects, AnswersEffects, CourseEffects),
  ],
  providers: [HttpService, AuthService],
})
export class AppStoreModule {}
