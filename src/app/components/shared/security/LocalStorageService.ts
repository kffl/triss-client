import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const personalDataKey = 'personal_data';
const tokenKey = 'access_token';
const request = 'request';
const status = 'status';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{

    personalDataSubject = new BehaviorSubject(this.personalData);

    set personalData(value: any) {
        this.personalDataSubject.next(value);
        localStorage.setItem(personalDataKey, JSON.stringify(value));
    }
    get personalData(): any {
        return JSON.parse(localStorage.getItem(personalDataKey));
    }

    tokenSubject = new BehaviorSubject(this.token);

    set token(value) {
      this.tokenSubject.next(value);
      localStorage.setItem(tokenKey, value);
    }
    get token() {
      return localStorage.getItem(tokenKey);
    }

    requestSubject = new BehaviorSubject(this.request);

    set request(value: string) {
      this.requestSubject.next(value);
      localStorage.setItem(request, value);
    }

    get request() {
      return localStorage.getItem(request);
    }

    statusSubject = new BehaviorSubject(this.status);

    set status(value: string) {
      this.statusSubject.next(value);
      localStorage.setItem(status, value);
    }

    get status() {
      return localStorage.getItem(status);
    }

}
