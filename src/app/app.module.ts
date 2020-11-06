import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainViewComponent} from './components/pages/main-view/main-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {SideMenuComponent} from './components/layout/side-menu/side-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PersonalDataComponent} from './components/pages/personal-data/personal-data.component';
import {AccountSettingsComponent} from './components/pages/account-settings/account-settings.component';
import {RequestsListComponent} from './components/pages/requests/requests-list/requests-list.component';
import {DirectorPanelComponent} from './components/pages/requests/director-panel/director-panel.component';
import {RectorPanelComponent} from './components/pages/requests/rector-panel/rector-panel.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RequestComponent} from './components/pages/requests/request/request.component';
import {AdvanceComponent} from './components/pages/requests/advance/advance.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {MatDialogModule} from '@angular/material/dialog';
import { InfoDialogComponent } from './components/extra/info-dialog/info-dialog.component';
import {MatTableModule} from '@angular/material/table';
import { GridComponent } from './components/shared/grid/grid.component';
import { RestService } from './components/pages/requests/rest-service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GridRestService } from './components/shared/grid/grid-rest-service';
import {MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule } from "@angular/material/core";
import {MatDatepickerModule } from "@angular/material/datepicker";
import { RequestComponent } from './components/pages/requests/new-request/request/request.component';
import { AdvanceComponent } from './components/pages/requests/new-request/advance/advance.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    PersonalDataComponent,
    AccountSettingsComponent,
    RequestsListComponent,
    DirectorPanelComponent,
    RectorPanelComponent,
    GridComponent,
    RectorPanelComponent,
    RequestComponent,
    AdvanceComponent
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    DigitOnlyModule,
    MatDialogModule
  ],
  providers: [
    MatDatepickerModule,
    RestService
    GridRestService
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
