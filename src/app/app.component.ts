import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter} from '@angular/material/core';
import {Title} from '@angular/platform-browser';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {SecurityService} from './components/shared/security/SecurityService';
import {LoginService} from './components/shared/security/LoginService';
import {LocalStorageService} from './components/shared/security/LocalStorageService';
import {RequestDataService} from './services/request-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'triss-client';
  constructor(
    private translateService: TranslateService,
    private dateAdapter: DateAdapter<any>,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private requestService: RequestDataService
  ) {
    const browserLang = translateService.getBrowserLang();
    translateService.setDefaultLang('en');
    translateService.use(browserLang);
    dateAdapter.setLocale(browserLang);
  }

  ngOnInit() {
    this.setTitle();

    this.activatedRoute.queryParams.subscribe(params => {
      this.securityService.processParams(params);
    });

    const token = this.localStorageService.token;
    if (token == null) {
      this.securityService.redirectToELogin();
    } else {
      this.loginService.login();
    }
  }

  setTitle() {
    this.translateService.onLangChange.subscribe(() => {
      this.translateService.get('TITLE').pipe(first()).subscribe(title => this.titleService.setTitle(title));
    });
  }
}
