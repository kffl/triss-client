import {Component, OnInit} from '@angular/core';
import {UseCaseEnum} from '../../../../../../extra/use-case-enum/use-case-enum';
import {FormData} from '../../../../../../extra/request-interface/request-interface';
import {LocalStorageService} from '../../../../../shared/security/LocalStorageService';
import {HttpErrorResponse} from '@angular/common/http';
import {RestService} from '../../../../../../services/rest-service';
import {ActorEnum} from '../../../../../../extra/actor-enum/actor-enum';
import {SecurityService} from '../../../../../shared/security/SecurityService';
import {DialogService} from '../../../../../../services/dialog.service';

@Component({
  selector: 'app-request-employee-read',
  templateUrl: './request-employee-read.component.html',
  styleUrls: ['./request-employee-read.component.scss']
})
export class RequestEmployeeReadComponent implements OnInit {

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
    this.useCase = UseCaseEnum.EmployeeRead;
    this.requestId = parseInt(this.localStorageService.request, 10);
    this.status = parseInt(this.localStorageService.status, 10);
    this.restService.getApplication(ActorEnum.Employee, this.requestId).subscribe(
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
