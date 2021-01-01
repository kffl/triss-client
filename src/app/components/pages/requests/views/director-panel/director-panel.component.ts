import { Component, OnInit } from '@angular/core';
import {AppRoutes} from '../../../../../extra/routes/appRoutes';
import {ActorEnum} from '../../../../../extra/actor-enum/actor-enum';


@Component({
  selector: 'app-director-panel',
  templateUrl: './director-panel.component.html',
  styleUrls: ['./director-panel.component.scss']
})
export class DirectorPanelComponent implements OnInit {

  appRoutes = AppRoutes;
  actor = ActorEnum.Director;
  constructor() { }


  headers = {
    firstName: {description: 'LIST.FIRST_NAME', type: 'text'},
    surname: {description: 'LIST.SURNAME', type: 'text'},
    instituteName: {description: 'LIST.INSTITUTE', type: 'text'},
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
