import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AppRoutes} from '../../../extra/routes/appRoutes';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @Input() sidenav;
  appRoutes = AppRoutes;

  constructor() {
  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.setOnLinksClickListeners();
  }

  setOnLinksClickListeners() {
    const links = document.getElementsByClassName('link');
    const that = this;
    Array.from(links).forEach(link => {
      link.addEventListener('click', () => {
        if (that.sidenav.mode === 'over') {
          that.sidenav.close();
        }
      });
    });
  }

}
