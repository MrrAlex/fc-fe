import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: any) {
    return this.http.get<T>(url, { params, withCredentials: true });
  }

  post<T>(url: string, payload: any, params?: any) {
    return this.http.post<T>(url, payload, { params });
  }
}
