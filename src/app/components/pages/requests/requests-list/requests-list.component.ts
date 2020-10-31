import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageInfo } from '../models';
import { RestService } from '../rest-service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {

  headers = {
    'country': {description: 'Kraj', type: 'text'},
    'city': {description: 'Miasto', type: 'text'}, 
    'abroadStartDate': {description: 'Data wyjazdu', type: 'date'}, 
    'abroadEndDate': {description: 'Data powrotu', type: 'date'},
    'status': {description: 'Status', type: 'text'}};
  data: any[]

  pageInfo: PageInfo;
  dataRestPath: string = 'http://localhost:8080/application/get';
  countRestPath: string = 'http://localhost:8080/application/count';

  constructor(private restSerivce: RestService) {

   }

  ngOnInit(): void {
    this.initializePageInfo();
  }

  private initializePageInfo() {
    this.pageInfo = new PageInfo();
    this.pageInfo.filter = {employeeId: 1};
    this.pageInfo.orderBy = 'id';
    this.pageInfo.desc = false;
    this.pageInfo.pageNumber = 0;
  }


  public onRowClick(row: any) {
    console.log(row);
  }

}
