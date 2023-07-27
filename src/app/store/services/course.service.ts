import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Constants } from '../../Constants';
import { Course } from '../models/course.model';
import {StudyModule} from "../models/study-module.model";
import {Lesson} from "../models/lesson.model";

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpService) {}

  public loadCourses() {
    return this.http.get<Course[]>(Constants.coursesListApi);
  }

  public loadCourse(id: string) {
    return this.http.get<Course>(Constants.courseApi(id));
  }

  createCourse(course: Course) {
    return this.http.post<Course>(Constants.coursesApi, course);
  }

  updateCourse(id: string, course: Course) {
    return this.http.post<Course>(Constants.courseApi(id), course);
  }

  loadModule(id: string) {
    return this.http.get<StudyModule>(Constants.moduleApi(id));
  }

  createModule(id: string, module: StudyModule) {
    return this.http.post<Course>(Constants.createModuleApi(id), module);
  }

  createLesson(moduleId: string, lesson: Lesson) {
    return this.http.post<StudyModule>(Constants.createLessonApi(moduleId), lesson);
  }

  updateLesson(lessonId: string, lesson: Lesson) {
    return this.http.post<Lesson>(Constants.updateLessonApi(lessonId), lesson);
  }

  updateModule(moduleId:string, module: any) {
    return this.http.post<StudyModule>(Constants.moduleApi(moduleId), module);
  }
}
