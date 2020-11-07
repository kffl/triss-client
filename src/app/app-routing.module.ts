import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from './components/pages/main-view/main-view.component';
import {AccountSettingsComponent} from './components/pages/account-settings/account-settings.component';
import {PersonalDataComponent} from './components/pages/personal-data/personal-data.component';
import {RequestsListComponent} from './components/pages/requests/requests-list/requests-list.component';
import {DirectorPanelComponent} from './components/pages/requests/director-panel/director-panel.component';
import {RectorPanelComponent} from './components/pages/requests/rector-panel/rector-panel.component';
import {RequestComponent} from './components/pages/requests/request/request.component';


const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'personal-data', component: PersonalDataComponent},
  {path: 'create-request', component: RequestComponent},
  {path: 'requests-list', component: RequestsListComponent},
  {path: 'director-panel', component: DirectorPanelComponent},
  {path: 'rector-panel', component: RectorPanelComponent},
  {path: 'settings', component: AccountSettingsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
