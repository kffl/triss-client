import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PersonalDataService} from '../../../../services/personal-data.service';


@Injectable()
export class WildaService implements CanActivate {

  constructor(private personalDataService: PersonalDataService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.personalDataService.hasRole(1);
  }
}
