import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from './components/pages/main-view/main-view.component';
import {PersonalDataComponent} from './components/pages/personal-data/personal-data.component';
import {RequestsListComponent} from './components/pages/requests/views/requests-list/requests-list.component';
import {DirectorPanelComponent} from './components/pages/requests/views/director-panel/director-panel.component';
import {RectorPanelComponent} from './components/pages/requests/views/rector-panel/rector-panel.component';
import {CreateRequestComponent} from './components/pages/requests/views/create-request/create-request.component';
import {RequestEmployeeReadComponent} from './components/pages/requests/views/requests-list/request-employee-read/request-employee-read.component';
import {AppRoutes} from './extra/routes/appRoutes';
import {WildaPanelComponent} from './components/pages/requests/views/wilda-panel/wilda-panel.component';
import {ReqeustDirectorComponent} from './components/pages/requests/views/director-panel/reqeust-director/reqeust-director.component';
import {ReqeustWildaComponent} from './components/pages/requests/views/wilda-panel/reqeust-wilda/reqeust-wilda.component';
import {RequestRectorComponent} from './components/pages/requests/views/rector-panel/request-rector/request-rector.component';
import {UserService} from './components/shared/security/UserService';
import {WildaService} from './components/shared/security/WildaService';

const routes: Routes = [
  {path: AppRoutes.home, component: MainViewComponent},
  {path: AppRoutes.personalData, component: PersonalDataComponent, canActivate: [UserService]},
  {path: AppRoutes.createRequest, component: CreateRequestComponent},
  {path: AppRoutes.requestsListEmployee, component: RequestsListComponent, canActivate: [UserService]},
  {path: AppRoutes.requestsListDirector, component: DirectorPanelComponent},
  {path: AppRoutes.requestsListWilda, component: WildaPanelComponent, canActivate: [WildaService]},
  {path: AppRoutes.requestsListRector, component: RectorPanelComponent},
  {path: AppRoutes.viewRequestEmployee, component: RequestEmployeeReadComponent, canActivate: [UserService]},
  {path: AppRoutes.viewRequestDirector, component: ReqeustDirectorComponent},
  {path: AppRoutes.viewRequestWilda, component: ReqeustWildaComponent, canActivate: [WildaService]},
  {path: AppRoutes.viewRequestRector, component: RequestRectorComponent},
  {path: '**', redirectTo: AppRoutes.home}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
