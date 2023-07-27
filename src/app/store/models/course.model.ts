import {StudyModule} from "./study-module.model";

export interface Course {
  _id: string;
  name: string;
  description: string;
  modules: StudyModule[];
}
