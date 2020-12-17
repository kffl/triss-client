import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {FormData} from '../../../../../../extra/request-interface/request-interface';
import {StatusEnum} from '../../../../../../extra/status-enum/status-enum';
import {LocalStorageService} from '../../../../../shared/security/LocalStorageService';
import {RestService} from '../../../../../../services/rest-service';
import {SecurityService} from '../../../../../shared/security/SecurityService';
import {DialogService} from '../../../../../../services/dialog.service';
import {ActorEnum} from '../../../../../../extra/actor-enum/actor-enum';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-reqeust-wilda',
  templateUrl: './reqeust-wilda.component.html',
  styleUrls: ['./reqeust-wilda.component.scss']
})
export class ReqeustWildaComponent implements OnInit {

  useCase: UseCaseEnum;
  form: FormData;
  requestId: number;
  status: number;
  formDataReady = false;

  constructor(
    private localStorageService: LocalStorageService,
    private restService: RestService,
    private securityService: SecurityService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.status = parseInt(this.localStorageService.status, 10);
    if (this.status === StatusEnum.waitingForDirector) {
      this.useCase = UseCaseEnum.WildaApprove;
    } else {
      this.useCase = UseCaseEnum.WildaAfterRector;
    }
    this.requestId = parseInt(this.localStorageService.request, 10);
    this.restService.getApplication(ActorEnum.Wilda, this.requestId).subscribe(
      (form: FormData) => {
        this.form = form;
        this.formDataReady = true;
      },
      (error: HttpErrorResponse) => {
        this.securityService.checkErrorAndRedirectToELogin(error);
        this.dialogService.showErrorDialog(
          'DIALOG.REQUEST_NOT_SENT.TITLE',
          'DIALOG.REQUEST_NOT_SENT.CONTENT',
          error
        );
      }
    );
  }

}
