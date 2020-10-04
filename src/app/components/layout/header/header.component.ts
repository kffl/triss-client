import {Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerColor: ThemePalette = 'primary';
  @Input() sidenav;
  constructor() { }

  ngOnInit(): void { }

  onMenuButtonClick() {
    this.sidenav.toggle();
  }
}
