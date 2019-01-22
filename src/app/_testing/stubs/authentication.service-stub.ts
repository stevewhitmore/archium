import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

export class AuthenticationServiceStub {

  sendSuccessResponse = false;
  loggedIn = true;

  constructor() {
  }

  login(username: string, password: string) {
    const correctUsername = 'swhitmore';
    const correctPassword = 'bunnies99';
    const usernameMatch = username === correctUsername;
    const passwordMatch = password === correctPassword;

    if (usernameMatch && passwordMatch) {
      this.sendSuccessResponse = true;
      return of({type: 'success', message: 'Login successful!'})
    } else {
      this.sendSuccessResponse = false;
      return Observable.create(observer => observer.error(new Error('Error! 400 Bad Request')));
    }
  }

  isLoggedIn() {
    // true by default for tests
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }
}