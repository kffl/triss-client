import {Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LocalStorageService} from './LocalStorageService';
import {RestService} from '../rest-service';
import {PersonalDataService} from '../personal-data.service';
import {NgxSpinnerService} from 'ngx-spinner';

export class LoginService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
    private restService: RestService,
    private personalDataService: PersonalDataService,
    private spinner: NgxSpinnerService
  ) {}


  public login(): void {
    this.spinner.show();
    this.restService.getPersonalData().subscribe(personalData => {
      this.personalDataService.personalData = personalData; // role.toString();
      this.spinner.hide();
    });
  }

  public logout(): void {
    this.localStorageService.removeToken();
    this.document.location.href = 'https://elogin.put.poznan.pl/?do=Logout&system=triss-dev.esys.put.poznan.pl';
  }
}
