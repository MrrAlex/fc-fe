import {environment} from "../environments/environment";

export class Constants {
  private static baseUrl = environment.baseUrl;

  public static coursesApi = `${Constants.baseUrl}/courses`
  public static coursesListApi = Constants.coursesApi
  public static courseApi = (id: string) => `${Constants.coursesApi}/${id}`

}
