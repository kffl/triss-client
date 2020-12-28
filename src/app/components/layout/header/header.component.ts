import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DateAdapter, ThemePalette} from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core';
import {DOCUMENT} from '@angular/common';
import {LoginService} from '../../shared/security/LoginService';
import {LocalStorageService} from '../../shared/security/LocalStorageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerColor: ThemePalette = 'primary';
  @Input() sidenav;
  innerWidth = window.innerWidth;
  breakpointWidth = 860;
  belowBreakpoint = this.innerWidth < this.breakpointWidth;

  fullName: string = null;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const previousInnerWidth = this.innerWidth;
    this.innerWidth = event.target.innerWidth;
    const widthIncrease = this.innerWidth > previousInnerWidth;
    this.belowBreakpoint = this.innerWidth < this.breakpointWidth;
    if (this.belowBreakpoint) {
      this.sidenav.mode = 'over';
      if (!widthIncrease && this.sidenav.opened) {
        this.sidenav.close();
      }
    } else {
      this.sidenav.mode = 'side';
      if (widthIncrease && !this.sidenav.opened) {
        this.sidenav.open();
      }
    }
  }

  constructor(
              @Inject(DOCUMENT) private document: Document,
              private translateService: TranslateService,
              private dateAdapter: DateAdapter<any>,
              private loginService: LoginService,
              private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    if (this.belowBreakpoint) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
    this.localStorageService.personalDataSubject.subscribe(personalData =>
      this.fullName = personalData.firstName + ' ' + personalData.surname
    );

  }

  onMenuButtonClick() {
    this.sidenav.toggle();
  }

  changeLanguageToPolish() {
    this.translateService.use('pl');
    this.dateAdapter.setLocale('pl');
  }

  changeLanguageToEnglish() {
    this.translateService.use('en');
    this.dateAdapter.setLocale('en');
  }

  logout() {
    this.loginService.logout();
  }

}
