import {Component, Input, OnInit} from '@angular/core';
import {PageInfo} from '../../../../../extra/app-grid-models/models';
import {Row} from '../../../../../extra/app-grid-models/row';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {RequestDataService} from '../../../../../services/request-data.service';
import {FormData, FormWithStatus} from '../../../../../extra/request-interface/request-interface';
import {DialogService} from '../../../../../services/dialog.service';
import {ActorEnum} from '../../../../../extra/actor-enum/actor-enum';
import {RestService} from '../../../../../services/rest-service';

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

  headers = {
    firstName: {description: 'Imię', type: 'text'},
    surname: {description: 'Nazwisko', type: 'text'},
    instituteName: {description: 'Instytut', type: 'text'},
    country: {description: 'Kraj', type: 'text'},
    city: {description: 'Miasto', type: 'text'},
    status: {description: 'Status', type: 'text'},
    abroadStartDate: {description: 'Data wyjazdu', type: 'date'},
    abroadEndDate: {description: 'Data powrotu', type: 'date'}};
  data: any[];

  pageInfo: PageInfo;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private requestDataService: RequestDataService,
    private dialogService: DialogService,
    private restService: RestService
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
        this.dialogService.showErrorDialog(
          'DIALOG.REQUEST_NOT_SENT.TITLE',
          'DIALOG.REQUEST_NOT_SENT.CONTENT',
          error
        );
      }
    );
  }

}
