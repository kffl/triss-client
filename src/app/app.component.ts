import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'triss-client';
  constructor(translateService: TranslateService, private dateAdapter: DateAdapter<any>) {
    const browserLang = translateService.getBrowserLang();
    translateService.setDefaultLang('en');
    translateService.use(browserLang);
    dateAdapter.setLocale(browserLang);
  }
}
