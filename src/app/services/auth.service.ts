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
    // @ts-ignore
    window.addEventListener('message', (message) => {
      if (message.origin === 'http://finuchenie.online') {
        console.log('set user to', message);
        this._user = message.data;
      }
    })

  }
}
