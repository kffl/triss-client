import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AppRoutes} from '../../../extra/routes/appRoutes';
import {LocalStorageService} from '../../shared/security/LocalStorageService';
import {PersonalDataService} from '../../../services/personal-data.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @Input() sidenav;
  appRoutes = AppRoutes;

  role: number;

  constructor(
    private localStorageService: LocalStorageService,
    private personalDataService: PersonalDataService
  ) {
  }


  ngOnInit(): void {
    this.personalDataService.getPersonalData().subscribe(newPersonalData => this.role = newPersonalData.employeeType);
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
