import {Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LocalStorageService} from './LocalStorageService';
import {RestService} from '../../../services/rest-service';

export class LoginService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
    private restService: RestService
  ) {}


  public login(): void {
    this.restService.getPersonalData().subscribe(personalData => {
      const role = personalData.employeeType;
      this.localStorageService.role = role.toString();
    });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.document.location.href = 'https://elogin.put.poznan.pl/?do=Logout&system=triss-dev.esys.put.poznan.pl';
  }
}
