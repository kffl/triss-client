import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {ActorEnum} from '../../../../../../extra/actor-enum/actor-enum';

@Component({
  selector: 'app-reqeust-rector',
  templateUrl: './request-rector.component.html',
  styleUrls: ['./request-rector.component.scss']
})
export class RequestRectorComponent implements OnInit {

  useCase: UseCaseEnum;
  actorEnum: ActorEnum;

  constructor() {
  }

  ngOnInit(): void {
    this.useCase = UseCaseEnum.Rector;
    this.actorEnum = ActorEnum.Rector;
  }
}
