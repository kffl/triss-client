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

  ngOnInit(): void {
  }

}
