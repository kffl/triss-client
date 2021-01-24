import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormData} from '../../extra/request-interface/request-interface';

const tokenKey = 'access_token';
const request = 'request';
const status = 'status';
const formData = 'formData';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  tokenSubject = new BehaviorSubject(this.token);
  requestSubject = new BehaviorSubject(this.request);
  statusSubject = new BehaviorSubject(this.status);

  set token(value) {
    this.tokenSubject.next(value);
    localStorage.setItem(tokenKey, value);
  }
  get token() {
    return localStorage.getItem(tokenKey);
  }

  set formData(value: FormData) {
    sessionStorage.setItem(formData, JSON.stringify(value));
  }
  get formData() {
    return JSON.parse(sessionStorage.getItem(formData));
  }

  set request(value: string) {
    this.requestSubject.next(value);
    localStorage.setItem(request, value);
  }
  get request() {
    return localStorage.getItem(request);
  }

  set status(value: string) {
    this.statusSubject.next(value);
    localStorage.setItem(status, value);
  }
  get status() {
    return localStorage.getItem(status);
  }

  removeToken(): void {
    this.tokenSubject.next(null);
    localStorage.removeItem(tokenKey);
  }

  removeStatus(): void {
    this.statusSubject.next(null);
    localStorage.removeItem(status);
  }

  removeRequest(): void {
    this.requestSubject.next(null);
    localStorage.removeItem(request);
  }
}
