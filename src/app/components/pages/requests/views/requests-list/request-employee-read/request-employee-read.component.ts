import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {ActorEnum} from '../../../../../../extra/actor-enum/actor-enum';

@Component({
  selector: 'app-request-employee-read',
  templateUrl: './request-employee-read.component.html',
  styleUrls: ['./request-employee-read.component.scss']
})
export class RequestEmployeeReadComponent implements OnInit {

  useCase: UseCaseEnum;
  actorEnum: ActorEnum;

  constructor() {
  }

  ngOnInit(): void {
    this.useCase = UseCaseEnum.EmployeeRead;
    this.actorEnum = ActorEnum.Employee;
  }

}
