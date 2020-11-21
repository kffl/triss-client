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

  ngOnInit(): void {
  }

}
