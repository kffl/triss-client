import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {StatusEnum} from '../../../../../../extra/status-enum/status-enum';
import {LocalStorageService} from '../../../../../shared/security/LocalStorageService';
import {ActorEnum} from '../../../../../../extra/actor-enum/actor-enum';

@Component({
  selector: 'app-reqeust-wilda',
  templateUrl: './reqeust-wilda.component.html',
  styleUrls: ['./reqeust-wilda.component.scss']
})
export class ReqeustWildaComponent implements OnInit {

  useCase: UseCaseEnum;
  actorEnum: ActorEnum;

  constructor(
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    const status = parseInt(this.localStorageService.status, 10);
    if (status === StatusEnum.waitingForWilda) {
      this.useCase = UseCaseEnum.WildaApprove;
    } else {
      this.useCase = UseCaseEnum.WildaAfterRector;
    }
    this.actorEnum = ActorEnum.Wilda;
  }

}
