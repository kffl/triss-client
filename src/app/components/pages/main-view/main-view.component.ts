import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


let production = false; //TODO this should be true on master!!!
let port = '4200'

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      let mode = params['state'];
      if (mode !== undefined) { //we are on localhost:4200
        this.document.location.href = 'http://localhost:' + port + '/?access_token=' +
                                       params['access_token'].toString() +
                                       '&token_type=' +
                                       params['token_type'].toString() +
                                       '&expires_in=' +
                                       params['expires_in'].toString();
      }
      let token = params['access_token'];
      if (token != undefined) {
        localStorage.setItem('access_token', token); //save token in local Storage
      }
    });


    let token = localStorage.getItem('access_token'); //get token

    if (production) {         //if we are on production
      if (token == null) {  //if we are not logged
        this.document.location.href = 'https://elogin.put.poznan.pl/?do=Authorize&system=triss-dev.esys.put.poznan.pl';
      }
    } else {    //if we are not on production
      if (token == null) { //if we are not logged
        this.document.location.href = 'https://elogin.put.poznan.pl/?do=Authorize&system=triss-dev.esys.put.poznan.pl&additional_data=dev';  
      }
    }
    
  }

}
