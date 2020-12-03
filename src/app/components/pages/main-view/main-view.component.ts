import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {SecurityService} from '../../shared/security/SecurityService';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private securityService: SecurityService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.securityService.processParams(params);
    });


    const token = localStorage.getItem('access_token'); // get token

    if (token == null) {
      this.securityService.redirectToELogin();
    }
  }

}
