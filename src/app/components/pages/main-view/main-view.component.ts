import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {SecurityService} from '../../shared/security/SecurityService';
import {LoginService} from '../../shared/security/LoginService';
import {LocalStorageService} from '../../shared/security/LocalStorageService';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private securityService: SecurityService,
              private loginService: LoginService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

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

}
