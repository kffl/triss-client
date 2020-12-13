import {Inject, Injectable} from '@angular/core';
import {Params} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {LocalStorageService} from './LocalStorageService';



const production = false;
const port = '4200';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {

  constructor(@Inject(DOCUMENT) private document: Document,
              private localStorageService: LocalStorageService) {}


  public processParams(params: Params): void {

    const mode = params.state;
    if (mode !== undefined) {  // we are on localhost:4200
      this.redirectToLocalHost(params, port);
    }

    const token = params.access_token;
    if (token !== undefined) {
      this.saveToken(token);
    }
  }

  public redirectToELogin(): void {
    if (production) {
      this.document.location.href = 'https://elogin.put.poznan.pl/?do=Authorize&system=triss-dev.esys.put.poznan.pl';
    } else {
      this.document.location.href = 'https://elogin.put.poznan.pl/?do=Authorize&system=triss-dev.esys.put.poznan.pl&additional_data=dev';
    }
  }

  private redirectToLocalHost(params: Params, port: string): void {
      this.document.location.href = 'http://localhost:' + port + '/?access_token=' +
        params.access_token.toString() +
        '&token_type=' +
        params.token_type.toString() +
        '&expires_in=' +
        params.expires_in.toString();
  }

  private saveToken(token: any) {
    this.localStorageService.token = token;
  }
}
