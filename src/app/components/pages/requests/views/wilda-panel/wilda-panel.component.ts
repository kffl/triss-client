import { Component, OnInit } from '@angular/core';
import {AppRoutes} from '../../../../../extra/routes/appRoutes';

@Component({
  selector: 'app-wilda-panel',
  templateUrl: './wilda-panel.component.html',
  styleUrls: ['./wilda-panel.component.scss']
})
export class WildaPanelComponent implements OnInit {

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
