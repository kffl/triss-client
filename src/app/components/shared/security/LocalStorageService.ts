import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const tokenKey = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{

    personalDataSubject = new BehaviorSubject(null);

    set personalData(value: any) {
        this.personalDataSubject.next(value);
    }
    get personalData(): any {
      return this.personalDataSubject.getValue();
    }

    tokenSubject = new BehaviorSubject(null);

    set token(value) {
      this.tokenSubject.next(value);
      localStorage.setItem(tokenKey, value);
    }
    get token() {
      return localStorage.getItem(tokenKey);
    }

    requestSubject = new BehaviorSubject(null);

    set request(value: string) {
      this.requestSubject.next(value);
    }
    get request() {
      return this.requestSubject.getValue();
    }

    statusSubject = new BehaviorSubject(null);

    set status(value: string) {
      this.statusSubject.next(value);
    }
    get status() {
      return this.statusSubject.getValue();
    }

    removeToken(): void {
      this.tokenSubject.next(null);
      localStorage.removeItem(tokenKey);
    }

}
