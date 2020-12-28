import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AppRoutes} from '../../../extra/routes/appRoutes';
import {LocalStorageService} from '../../shared/security/LocalStorageService';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @Input() sidenav;
  appRoutes = AppRoutes;

  role: number;

  constructor(private localStorageService: LocalStorageService ) {
  }


  ngOnInit(): void {
    this.localStorageService.personalDataSubject.subscribe((newPersonalData) => {
      if (newPersonalData != null) {
        this.role = newPersonalData.employeeType;
      }
    });
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
