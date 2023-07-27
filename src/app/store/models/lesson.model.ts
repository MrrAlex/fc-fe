import {Question} from "./question.model";

export interface Lesson {
  _id: string;
  name: string;
  questions: Question[];
}
