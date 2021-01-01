import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PageInfo} from '../../../extra/app-grid-models/models';
import {CustomDataSource} from './data-source';
import {Row} from '../../../extra/app-grid-models/row';
import {RestService} from '../../../services/rest-service';
import {ActorEnum} from '../../../extra/actor-enum/actor-enum';
import {SecurityService} from '../security/SecurityService';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() columnHeader;
  filteredColumnHeader: any = null;
  @Input() source;
  @Input() pageInfo: PageInfo;
  @Input() pageSizeOptions = [10, 25, 50];
  @Input() actor: ActorEnum;

  @Output() onRowClick = new EventEmitter<Row>();

  objectKeys = Object.keys;
  dataSource: CustomDataSource;

  objectCount = 100;
  columnFilters: any = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private restService: RestService,
    private securityService: SecurityService,
    private translateService: TranslateService,
  ) {
    this.translateService.onLangChange.subscribe(generator => this.onLangChange(generator.lang));
  }

  onLangChange(lang: string) {
    this.dataSource.loadData(this.actor, this.pageInfo);
    this.filteredColumnHeader = Object.assign({}, this.columnHeader);
    if (lang === 'pl') {
      delete this.filteredColumnHeader.statusEng;
    } else {
      delete this.filteredColumnHeader.statusPl;
    }
    this.columnFilters = {};
    for (const filter in this.filteredColumnHeader) {
      if (this.filteredColumnHeader.hasOwnProperty(filter)) {
        this.columnFilters[filter + 'Filter'] = this.filteredColumnHeader[filter];
      }
    }
  }

  ngOnInit() {
    this.prepareInitPageInfo();
    this.loadCount();
    this.dataSource = new CustomDataSource(this.restService);
    this.onLangChange(this.translateService.currentLang);
    this.dataSource.getRowSubject().subscribe(rows => this.processRows(rows));
  }

  processRows(rows: any[]) {
    if (rows.length > 0) {
      const currentLang = this.translateService.currentLang;
      let locales: string;
      if (currentLang === 'pl') {
        locales = 'pl-PL';
      } else {
        locales = 'en-US';
      }
      rows.forEach(row => {
        row.abroadStartDate = new Date(row.abroadStartDate).toLocaleDateString(locales);
        row.abroadEndDate = new Date(row.abroadEndDate).toLocaleDateString(locales);
      });
    }
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
                    .pipe(tap(() => this.loadPage()))
                    .subscribe();
  }

  public onFilterChange(event: any, tableFilter: any) {
    const columnName = tableFilter.replace('Filter', '');
    this.pageInfo.filter[columnName] = event.currentTarget.value;
    this.pageInfo.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.loadPage();
    this.loadCount();
  }

  public onDateFilterChange(event: any, tableFilter: any) {
    const columnName = tableFilter.replace('Filter', '');
    this.pageInfo.filter[columnName] = event.value;
    this.pageInfo.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.loadPage();
    this.loadCount();
  }

  public onRowClicked(row: Row) {
    this.onRowClick.emit(row);
  }

  private prepareInitPageInfo() {
    if (this.pageInfo === undefined) {
      this.pageInfo = new PageInfo();
    }
    if (this.pageInfo.filter === undefined) {
      this.pageInfo.filter = {};
    }
    if (this.pageInfo.orderBy === undefined) {
      this.pageInfo.orderBy = 'id';
    }
    if (this.pageInfo.desc === undefined) {
      this.pageInfo.desc = false;
    }
    if (this.pageInfo.pageSize === undefined) {
      this.pageInfo.pageSize = this.pageSizeOptions[0];
    }
  }

  private loadPage() {
    this.pageInfo.pageNumber = this.paginator.pageIndex;
    this.pageInfo.pageSize = this.paginator.pageSize;
    this.pageInfo.desc = this.sort.direction !== 'asc';
    if (this.sort.active !== undefined) {
      this.pageInfo.orderBy = this.sort.active;
    }
    this.dataSource.loadData(this.actor, this.pageInfo);
  }

  private loadCount() {
    this.restService.getGridCount(this.actor, this.pageInfo).subscribe(result => {
      this.objectCount = result;
    });
  }
}
