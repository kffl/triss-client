import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {ActorEnum} from '../../../../../../extra/actor-enum/actor-enum';

@Component({
  selector: 'app-reqeust-director',
  templateUrl: './reqeust-director.component.html',
  styleUrls: ['./reqeust-director.component.scss']
})
export class ReqeustDirectorComponent implements OnInit {

  useCase: UseCaseEnum;
  actorEnum: ActorEnum;

  constructor() {
  }

  ngOnInit(): void {
    this.useCase = UseCaseEnum.Director;
    this.actorEnum = ActorEnum.Director;
  }

}
