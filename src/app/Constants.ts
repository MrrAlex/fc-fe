import { environment } from '../environments/environment';

export class Constants {
  private static baseUrl = environment.baseUrl;

  public static coursesApi = `${Constants.baseUrl}/course`;
  public static coursesListApi = Constants.coursesApi;
  public static courseApi = (id: string) => `${Constants.coursesApi}/${id}`;
  public static createModuleApi = (id: string) =>
    `${Constants.coursesApi}/${id}/module/`;

  public static modulesApi = `${Constants.baseUrl}/study-module`;
  public static moduleApi = (id: string) => `${Constants.modulesApi}/${id}`;
  public static createLessonApi = (moduleId: string) =>
    `${Constants.modulesApi}/${moduleId}/lesson/`;

  public static lessonsApi = `${Constants.baseUrl}/lesson`;
  public static lessonApi = (id: string) => `${Constants.lessonsApi}/${id}`
  public static answersByLesson = (id: string, user: string) => `${Constants.lessonsApi}/${id}/user/${user}/answers`
  public static assignQuestionToLessonApi = (id: string) => `${Constants.lessonsApi}/${id}/question`
  public static updateLessonApi = (lessonId: string) =>
    `${Constants.lessonsApi}/${lessonId}/`;

  public static answersApi = `${Constants.baseUrl}/answer`;
  public static storeMultipleAnswerApi = (user: string) => `${Constants.baseUrl}/answer/user/${user}`;
}
