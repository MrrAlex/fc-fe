import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Constants } from '../../Constants';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  constructor(private http: HttpService) {}

  saveAnswers(answers: Answer[], user: string) {
    return this.http.post<Answer[]>(
      Constants.storeMultipleAnswerApi(user),
      answers
    );
  }

  loadAnswers(lessonId: string, user: string) {
    return this.http.get<Answer[]>(Constants.answersByLesson(lessonId), {
      userId: user,
    });
  }

  loadPdfWithAnswers(user: string, module?: string, course?: string) {
    const params: any = {};
    if (module) {
      params.module = module;
    }
    if (course) {
      params.course = course;
    }
    return this.http.post<Blob>(Constants.generatePdf(user), null, params);
  }
}
