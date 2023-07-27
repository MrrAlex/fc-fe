import {Lesson} from "./lesson.model";

export interface StudyModule {
  _id: string;
  name: string;
  lessons: Lesson[];
}
