import { Component, OnInit } from '@angular/core';
import {AppRoutes} from '../../../../../extra/routes/appRoutes';


@Component({
  selector: 'app-director-panel',
  templateUrl: './director-panel.component.html',
  styleUrls: ['./director-panel.component.scss']
})
export class DirectorPanelComponent implements OnInit {

  appRoutes = AppRoutes;
  constructor() { }

  
  headers = {
    firstName: {description: 'Imię', type: 'text'},
    surname: {description: 'Nazwisko', type: 'text'},
    instituteName: {description: 'Instytut', type: 'text'},
    country: {description: 'Kraj', type: 'text'},
    city: {description: 'Miasto', type: 'text'},
    status: {description: 'Status', type: 'text'},
    abroadStartDate: {description: 'Data wyjazdu', type: 'date'},
    abroadEndDate: {description: 'Data powrotu', type: 'date'}};

  ngOnInit(): void {
  }

}
