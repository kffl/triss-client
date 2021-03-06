import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

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
import {RequestsListComponent} from './components/pages/requests/views/requests-list/requests-list.component';
import {DirectorPanelComponent} from './components/pages/requests/views/director-panel/director-panel.component';
import {RectorPanelComponent} from './components/pages/requests/views/rector-panel/rector-panel.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RequestComponent} from './components/pages/requests/forms/request/request.component';
import {AdvanceComponent} from './components/pages/requests/forms/advance/advance.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {MatDialogModule} from '@angular/material/dialog';
import { InfoDialogComponent } from './components/shared/info-dialog/info-dialog.component';
import {MatTableModule} from '@angular/material/table';
import { GridComponent } from './components/shared/grid/grid.component';
import { RestService } from './services/rest-service';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateRequestComponent } from './components/pages/requests/views/create-request/create-request.component';
import { RequestEmployeeReadComponent } from './components/pages/requests/views/requests-list/request-employee-read/request-employee-read.component';
import { WildaPanelComponent } from './components/pages/requests/views/wilda-panel/wilda-panel.component';
import { PanelTemplateComponent } from './components/pages/requests/views/panel-template/panel-template.component';
import { ReqeustDirectorComponent } from './components/pages/requests/views/director-panel/reqeust-director/reqeust-director.component';
import { ReqeustWildaComponent } from './components/pages/requests/views/wilda-panel/reqeust-wilda/reqeust-wilda.component';
import { RequestRectorComponent } from './components/pages/requests/views/rector-panel/request-rector/request-rector.component';
import { RejectDialogComponent } from './components/shared/reject-dialog/reject-dialog.component';
import {SecurityService} from './services/security/SecurityService';
import {SafeHttpClient} from './services/security/SafeHttpClient';
import {LoginService} from './services/security/LoginService';
import { UserService } from './services/security/roles/UserService';
import { WildaService } from './services/security/roles/WildaService';
import { DirectorService } from './services/security/roles/DirectorService';
import { RectorService } from './services/security/roles/RectorService';
import { LocalStorageService } from './services/security/LocalStorageService';
import {HttpErrorInterceptor} from './services/security/HttpErrorInterceptor';
import {PaginatorIntl} from './extra/paginator-intl/paginator-intl';
import {NgxSpinnerModule} from 'ngx-spinner';
import { YesNoDialogComponent } from './components/shared/yes-no-dialog/yes-no-dialog.component';

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
    RequestsListComponent,
    DirectorPanelComponent,
    RectorPanelComponent,
    GridComponent,
    RectorPanelComponent,
    RequestComponent,
    AdvanceComponent,
    InfoDialogComponent,
    CreateRequestComponent,
    RequestEmployeeReadComponent,
    WildaPanelComponent,
    PanelTemplateComponent,
    ReqeustDirectorComponent,
    ReqeustWildaComponent,
    RequestRectorComponent,
    RejectDialogComponent,
    YesNoDialogComponent
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
    MatDialogModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    MatDatepickerModule,
    RestService,
    SecurityService,
    LoginService,
    UserService,
    WildaService,
    DirectorService,
    RectorService,
    RequestComponent,
    LocalStorageService,
    SafeHttpClient,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-US'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [SecurityService]
    },
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorIntl
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [InfoDialogComponent, RejectDialogComponent, YesNoDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
