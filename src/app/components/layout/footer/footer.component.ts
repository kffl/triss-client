import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerColor: ThemePalette = 'primary';
  currentYear: string = new Date().getFullYear().toString(10);

  constructor() { }

  ngOnInit(): void {
  }

}
