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
    return this.http.get<Answer[]>(Constants.answersByLesson(lessonId), {userId: user});
  }
}
