import { Component, OnInit, Input, ViewChild, SimpleChanges, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PageInfo } from '../../pages/requests/models';
import { CustomDataSource } from './data-source';
import { GridRestService } from './grid-rest-service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() columnHeader;
  @Input() source;
  @Input() pageInfo: PageInfo
  @Input() pageSizeOptions = [10, 25, 50];
  @Input() dataRestPath: string;
  @Input() countRestPath: string;

  @Output() onRowClick = new EventEmitter<any>();

  objectKeys = Object.keys;
  dataSource: CustomDataSource;

  objectCount: number = 100;
  columnFilters: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private restService: GridRestService) { }

  ngOnInit() {
    this.prepareInitPageInfo();
    this.loadCount();
    for(let filter in this.columnHeader) {
       this.columnFilters[filter + "Filter"] = this.columnHeader[filter];
    }
    this.dataSource = new CustomDataSource(this.restService);
    this.dataSource.loadData(this.dataRestPath, this.pageInfo);


  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
                    .pipe(tap(() => this.loadPage()))
                    .subscribe();
  }

  public onFilterChange(event: any, tableFilter: any) {
    let columnName = tableFilter.replace("Filter", '');
    this.pageInfo.filter[columnName] = event.currentTarget.value;
    this.pageInfo.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.loadPage();
    this.loadCount();
  }

  public onDateFilterChange(event: any, tableFilter: any) {
    let columnName = tableFilter.replace("Filter", '');
    this.pageInfo.filter[columnName] = event.value;
    this.pageInfo.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.loadPage();
    this.loadCount();
  }

  public onRowClicked(row: any) {
    this.onRowClick.emit(row);
  }

  private prepareInitPageInfo() {
    if (this.pageInfo == undefined) {
      this.pageInfo = new PageInfo();
    }
    if (this.pageInfo.filter == undefined) {
      this.pageInfo.filter = {}; 
    }
    if (this.pageInfo.orderBy == undefined) {
      this.pageInfo.orderBy = "id";
    }
    if (this.pageInfo.desc == undefined) {
      this.pageInfo.desc = false;
    }
      if (this.pageInfo.pageSize == undefined) {
      this.pageInfo.pageSize = this.pageSizeOptions[0];;
    }
  }

  private loadPage() {
    this.pageInfo.pageNumber = this.paginator.pageIndex;
    this.pageInfo.pageSize = this.paginator.pageSize;
    this.pageInfo.desc = this.sort.direction != "asc" 
    if (this.sort.active != undefined) {
      this.pageInfo.orderBy = this.sort.active
    }
    this.dataSource.loadData(this.dataRestPath, this.pageInfo);
  }

  private loadCount() {
    this.restService.getMono(this.countRestPath, this.pageInfo).subscribe(result => {
      this.objectCount = result;
    })
  }

}