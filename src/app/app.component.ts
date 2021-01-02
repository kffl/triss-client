import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter} from '@angular/material/core';
import {Title} from '@angular/platform-browser';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'triss-client';
  constructor(
    private translateService: TranslateService,
    private dateAdapter: DateAdapter<any>,
    private titleService: Title
  ) {
    const browserLang = translateService.getBrowserLang();
    translateService.setDefaultLang('en');
    translateService.use(browserLang);
    dateAdapter.setLocale(browserLang);
    this.setTitle();
  }

  setTitle() {
    this.translateService.onLangChange.subscribe(() => {
      this.translateService.get('TITLE').pipe(first()).subscribe(title => this.titleService.setTitle(title));
    });
  }
}
