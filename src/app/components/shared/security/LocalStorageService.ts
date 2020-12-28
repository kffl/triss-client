import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PersonalDataInterface} from '../../../extra/personal-data-interface/personal-data.interface';


const personalDataKey = 'personal_data';
const tokenKey = 'access_token';
const request = 'request';
const status = 'status';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  personalDataSubject = new BehaviorSubject<PersonalDataInterface>(this.personalData);

  set personalData(value: PersonalDataInterface) {
    this.personalDataSubject.next(value);
    localStorage.setItem(personalDataKey, JSON.stringify(value));
  }
  get personalData(): PersonalDataInterface {
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
    // return this.requestSubject.getValue();
    return localStorage.getItem(request);
  }

  statusSubject = new BehaviorSubject(this.status);

  set status(value: string) {
    this.statusSubject.next(value);
    localStorage.setItem(status, value);
  }
  get status() {
    // return this.statusSubject.getValue();
    return localStorage.getItem(status);
  }

  removeToken(): void {
    this.tokenSubject.next(null);
    localStorage.removeItem(tokenKey);
  }

}
