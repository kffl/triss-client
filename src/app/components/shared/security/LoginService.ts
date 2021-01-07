import {Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LocalStorageService} from './LocalStorageService';
import {RestService} from '../../../services/rest-service';
import {PersonalDataService} from '../../../services/personal-data.service';

export class LoginService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
    private restService: RestService,
    private personalDataService: PersonalDataService
  ) {}


  public login(): void {
    this.restService.getPersonalData().subscribe(personalData => {
      this.personalDataService.personalData = personalData; // role.toString();
    });
  }

  public logout(): void {
    this.localStorageService.removeToken();
    this.document.location.href = 'https://elogin.put.poznan.pl/?do=Logout&system=triss-dev.esys.put.poznan.pl';
  }
}
