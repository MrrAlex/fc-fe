import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Constants } from '../../Constants';
import { Course } from '../models/course.model';

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
}
