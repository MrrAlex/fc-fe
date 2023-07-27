import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Constants } from '../../Constants';
import { Course } from '../models/course.model';
import { StudyModule } from '../models/study-module.model';
import { Lesson } from '../models/lesson.model';
import {Question} from "../models/question.model";

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpService) {}

  public loadLesson(id: string) {
    return this.http.get<Lesson>(Constants.lessonApi(id));
  }

  public updateLesson(id: string, lesson: Lesson) {
    return this.http.post<Lesson>(Constants.lessonApi(id), lesson);
  }

  public saveQuestionsForLesson(id: string, questions: Question[]) {
    return this.http.post<Lesson>(Constants.assignQuestionToLessonApi(id), questions);
  }
}
