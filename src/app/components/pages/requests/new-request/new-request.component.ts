import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  paths: string[] = [];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.config.forEach(route => this.paths.push('/' + route.path));
  }

}
