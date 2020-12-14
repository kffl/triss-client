import {Component, Input, OnInit} from '@angular/core';
import {PageInfo} from '../../../../../extra/app-grid-models/models';
import {Row} from '../../../../../extra/app-grid-models/row';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {RequestDataService} from '../../../../../services/request-data.service';
import {FormData, FormWithStatus} from '../../../../../extra/request-interface/request-interface';
import { SafeHttpClient } from 'src/app/components/shared/security/SafeHtppClient';
import {DialogService} from '../../../../../services/dialog.service';
import {ActorEnum} from '../../../../../extra/actor-enum/actor-enum';
import {RestService} from '../../../../../services/rest-service';
import {SecurityService} from '../../../../shared/security/SecurityService';

@Component({
  selector: 'app-panel-template',
  templateUrl: './panel-template.component.html',
  styleUrls: ['./panel-template.component.scss']
})
export class PanelTemplateComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() linkToSingleRequest: string;
  @Input() filter: any;
  @Input() orderBy: string;
  @Input() desc: boolean;
  @Input() actor: ActorEnum;
  @Input() headers;

  data: any[];

  pageInfo: PageInfo;

  constructor(
    private http: SafeHttpClient,
    private router: Router,
    private translateService: TranslateService,
    private requestDataService: RequestDataService,
    private dialogService: DialogService,
    private restService: RestService,
    private securityService: SecurityService
  ) { }

  ngOnInit(): void {
    this.initializePageInfo();
  }

  private initializePageInfo() {
    this.pageInfo = new PageInfo();
    this.pageInfo.filter = this.filter || {};
    this.pageInfo.orderBy = this.orderBy || 'id';
    this.pageInfo.desc = this.desc || false;
    this.pageInfo.pageNumber = 0;
  }

  onListRowClicked(row: Row) {
    this.restService.getApplication(this.actor, row.id).subscribe(
      (form: FormData) => {
        const formWithStatus: FormWithStatus = {
          form,
          status: row.status
        };
        this.requestDataService.setCurrentForm(formWithStatus);
        this.router.navigateByUrl(this.linkToSingleRequest);
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
