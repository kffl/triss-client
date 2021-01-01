import {Component, OnInit} from '@angular/core';
import {AppRoutes} from '../../../../../extra/routes/appRoutes';
import {ActorEnum} from '../../../../../extra/actor-enum/actor-enum';


@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {

  appRoutes = AppRoutes;
  actor = ActorEnum.Employee;
  constructor() {
  }

  headers = {
    country: {description: 'LIST.COUNTRY', type: 'text'},
    city: {description: 'LIST.CITY', type: 'text'},
    statusPl: {description: 'LIST.STATUS', type: 'text'},
    statusEng: {description: 'LIST.STATUS', type: 'text'},
    abroadStartDate: {description: 'LIST.START_DATE', type: 'date'},
    abroadEndDate: {description: 'LIST.END_DATE', type: 'date'}
  };

  ngOnInit(): void {
  }
}
