import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.retrieveLoginData();
  }

  private _user!: string;

  get currentUser() {
    return this._user;
  }

  retrieveLoginData() {
    this._user = 'some user id';
  }
}
