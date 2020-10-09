import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerColor: ThemePalette = 'primary';
  @Input() sidenav;
  innerWidth = window.innerWidth;
  breakpointWidth = 900;
  belowBreakpoint = this.innerWidth < this.breakpointWidth;

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

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    if (this.belowBreakpoint) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }

  onMenuButtonClick() {
    this.sidenav.toggle();
  }

  changeLanguageToPolish() {
    this.translateService.use('pl');
  }

  changeLanguageToEnglish() {
    this.translateService.use('en');
  }
}
