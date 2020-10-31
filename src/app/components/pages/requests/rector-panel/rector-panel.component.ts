import { Component, OnInit } from '@angular/core';
import { PageInfo } from '../models';

@Component({
  selector: 'app-rector-panel',
  templateUrl: './rector-panel.component.html',
  styleUrls: ['./rector-panel.component.scss']
})
export class RectorPanelComponent implements OnInit {

  headers = {
    'country': {description: 'Kraj', type: 'text'},
    'city': {description: 'Miasto', type: 'text'}, 
    'abroadStartDate': {description: 'Data wyjazdu', type: 'date'}, 
    'abroadEndDate': {description: 'Data powrotu', type: 'date'},
    'status': {description: 'Status', type: 'text'}};  

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
