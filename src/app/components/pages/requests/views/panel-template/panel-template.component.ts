import {Component, Input, OnInit} from '@angular/core';
import {PageInfo} from '../../../../../extra/app-grid-models/models';
import {Row} from '../../../../../extra/app-grid-models/row';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../../shared/info-dialog/info-dialog.component';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {RequestDataService} from '../../../../../services/request-data.service';
import {FormData, FormWithStatus} from '../../../../../extra/request-interface/request-interface';
import { SafeHttpClient } from 'src/app/components/shared/security/SafeHtppClient';

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
  @Input() headers;

  data: any[];

  pageInfo: PageInfo;
  dataRestPath: string;
  countRestPath: string;

  constructor(
    private http: SafeHttpClient,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private requestDataService: RequestDataService,
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
        // this.requestDataService.setCurrentForm(form, row.status);
        const formWithStatus: FormWithStatus = {
          form,
          status: row.status
        };
        this.requestDataService.setCurrentForm(formWithStatus);
        this.router.navigateByUrl(this.linkToSingleRequest);
      },
      (error: HttpErrorResponse) => {
        this.translateService.get('DIALOG.REQUEST_NOT_SENT.CONTENT').subscribe(content => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            title: 'DIALOG.REQUEST_NOT_SENT.TITLE',
            content: `${content} ${error.status} ${error.statusText}`,
            showCloseButton: true
          };
          this.dialog.open(InfoDialogComponent, dialogConfig);
        });
      }
    );
  }

}
