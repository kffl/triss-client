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

  ngOnInit(): void {
  }


}
