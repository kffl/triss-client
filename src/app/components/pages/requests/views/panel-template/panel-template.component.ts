import {Component, Input, OnInit} from '@angular/core';
import {PageInfo} from '../../../../../extra/app-grid-models/models';
import {Row} from '../../../../../extra/app-grid-models/row';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {RequestDataService} from '../../../../../services/request-data.service';
import {FormData, FormWithStatus} from '../../../../../extra/request-interface/request-interface';
import {DialogService} from '../../../../../services/dialog.service';

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
  @Input() dataPath: string;
  @Input() countPath: string;
  @Input() singleRequestPath: string;

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
  dataRestPath: string;
  countRestPath: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private translateService: TranslateService,
    private requestDataService: RequestDataService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.dataRestPath = `${window.location.protocol}//${window.location.hostname}:8080/${this.dataPath}`;
    this.countRestPath = `${window.location.protocol}//${window.location.hostname}:8080/${this.countPath}`;
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
    const url = `${window.location.protocol}//${window.location.hostname}:8080/${this.singleRequestPath}`;
    this.http.post<object>(url, row.id).subscribe(
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
