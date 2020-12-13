import {PersonalDataInterface} from '../../../extra/personal-data-interface/personal-data.interface';
import {SafeHttpClient} from './SafeHtppClient';
import {Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';

export class LoginService {

  constructor(private http: SafeHttpClient,
              @Inject(DOCUMENT) private document: Document,
              private localStorageService: LocalStorageService) {}


  public login(): void {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/employee/get`;

    this.http.post<PersonalDataInterface>(url, {}).subscribe(personalData => {
      const role = personalData.employeeType;
      this.localStorageService.role = role.toString();
    });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.document.location.href = 'https://elogin.put.poznan.pl/?do=Logout&system=triss-dev.esys.put.poznan.pl';
  }
}
