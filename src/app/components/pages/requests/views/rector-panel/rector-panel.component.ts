import { Component, OnInit } from '@angular/core';
import {AppRoutes} from '../../../../../extra/routes/appRoutes';

@Component({
  selector: 'app-rector-panel',
  templateUrl: './rector-panel.component.html',
  styleUrls: ['./rector-panel.component.scss']
})
export class RectorPanelComponent implements OnInit {

  appRoutes = AppRoutes;
  constructor() { }

  ngOnInit(): void {
  }

}
