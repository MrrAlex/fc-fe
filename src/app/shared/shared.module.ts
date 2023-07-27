import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCourseQuestionsListComponent } from './components/edit-course-questions-list/edit-course-questions-list.component';
import { QuestionTextDisplayComponent } from './components/questions/question-text-display/question-text-display.component';
import { QuestionSectionDisplayComponent } from './components/questions/question-section-display/question-section-display.component';
import { QuestionCheckboxDisplayComponent } from './components/questions/question-checkbox-display/question-checkbox-display.component';
import { QuestionRadioDisplayComponent } from './components/questions/question-radio-display/question-radio-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { OrderListModule } from 'primeng/orderlist';
import { QuestionRangeDisplayComponent } from './components/questions/question-range-display/question-range-display.component';
import { QuestionDownloadDisplayComponent } from './components/questions/question-download-display/question-download-display.component';
import { RatingModule } from 'primeng/rating';
import { AuthService } from '../services/auth.service';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    EditCourseQuestionsListComponent,
    QuestionTextDisplayComponent,
    QuestionSectionDisplayComponent,
    QuestionCheckboxDisplayComponent,
    QuestionRadioDisplayComponent,
    QuestionRangeDisplayComponent,
    QuestionDownloadDisplayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextareaModule,
    RadioButtonModule,
    ButtonModule,
    DialogModule,
    OrderListModule,
    RatingModule,
    ConfirmDialogModule,
  ],
  exports: [
    EditCourseQuestionsListComponent,
    QuestionTextDisplayComponent,
    QuestionSectionDisplayComponent,
    QuestionCheckboxDisplayComponent,
    QuestionRadioDisplayComponent,
  ],
  providers: [DialogService, AuthService, ConfirmationService],
})
export class SharedModule {}
