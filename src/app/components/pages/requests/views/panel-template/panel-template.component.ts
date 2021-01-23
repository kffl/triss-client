import {Component, Input, OnInit} from '@angular/core';
import {PageInfo} from '../../../../../extra/app-grid-models/models';
import {Row} from '../../../../../extra/app-grid-models/row';
import {Router} from '@angular/router';
import {ActorEnum} from '../../../../../extra/actor-enum/actor-enum';
import {LocalStorageService} from '../../../../../services/security/LocalStorageService';

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
    private router: Router,
    private localStorageService: LocalStorageService
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
    this.localStorageService.request = String(row.id);
    this.localStorageService.status = String(row.status);
    this.router.navigateByUrl(this.linkToSingleRequest);
  }

}
