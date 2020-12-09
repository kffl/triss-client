import {Component, OnInit, AfterViewInit, Input, ApplicationRef, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import {AppRoutes} from '../../../extra/routes/appRoutes';
import { LocalStorageService } from '../../shared/security/LocalStorageService';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @Input() sidenav;
  appRoutes = AppRoutes;

  private role: string;
  constructor(private localStorageService: LocalStorageService,
              private ref: ChangeDetectorRef ) {
  }


  ngOnInit(): void {
    
    this.localStorageService.roleSubject.subscribe((newRole) => {
      console.log('role: ' + newRole);
      this.role = newRole;
    })

    
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
