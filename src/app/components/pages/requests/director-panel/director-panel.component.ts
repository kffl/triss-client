import { Component, OnInit } from '@angular/core';
import { PageInfo } from '../models';

@Component({
  selector: 'app-director-panel',
  templateUrl: './director-panel.component.html',
  styleUrls: ['./director-panel.component.scss']
})
export class DirectorPanelComponent implements OnInit {

  headers = {
    'country': {description: 'Kraj', type: 'text'},
    'city': {description: 'Miasto', type: 'text'}, 
    'abroadStartDate': {description: 'Data wyjazdu', type: 'date'}, 
    'abroadEndDate': {description: 'Data powrotu', type: 'date'},
    'status': {description: 'Status', type: 'text'}};  data: any[]

  pageInfo: PageInfo;
  dataRestPath: string = 'http://localhost:8080/application/get';
  countRestPath: string = 'http://localhost:8080/application/count';
  
  constructor() { }

  ngOnInit(): void {
    this.initializePageInfo();
  }

  
  private initializePageInfo() {
    this.pageInfo = new PageInfo();
    this.pageInfo.filter = {}; 
    this.pageInfo.orderBy = 'abroadStartDate';
    this.pageInfo.pageNumber = 0;
    this.pageInfo.desc = false;
  }

  private onRowClick(row: any) {
    console.log(row);
  }
  
}
