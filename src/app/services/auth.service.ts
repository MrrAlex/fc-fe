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
    window.addEventListener('message', (message) => {
      if (message.origin === 'http://finuchenie.online') {
        this._user = message.data;
      }
    });
  }
}
