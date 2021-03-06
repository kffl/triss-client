import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PersonalDataService} from '../../personal-data.service';
import {Observable} from 'rxjs';


@Injectable()
export class RectorService implements CanActivate {

  constructor(private personalDataService: PersonalDataService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.personalDataService.hasRole(3);
  }
}
