export interface Answer {
  _id?: string;
  questionId: string;
  lessonId:string;
  answer: string[] | string[][];
}
