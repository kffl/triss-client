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
import { PersonalDataComponent } from './components/pages/personal-data/personal-data.component';
import { AccountSettingsComponent } from './components/pages/account-settings/account-settings.component';
import { NewRequestComponent } from './components/pages/requests/new-request/new-request.component';
import { RequestsListComponent } from './components/pages/requests/requests-list/requests-list.component';
import { DirectorPanelComponent } from './components/pages/requests/director-panel/director-panel.component';
import { RectorPanelComponent } from './components/pages/requests/rector-panel/rector-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    PersonalDataComponent,
    AccountSettingsComponent,
    NewRequestComponent,
    RequestsListComponent,
    DirectorPanelComponent,
    RectorPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
