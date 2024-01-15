import {Question} from "./question.model";

export interface Lesson {
  _id: string;
  name: string;
  course?: string;
  questions: Question[];
}
