import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PersonalDataService} from '../../../../services/personal-data.service';
import {Observable} from 'rxjs';


@Injectable()
export class DirectorService implements CanActivate {

  constructor(private personalDataService: PersonalDataService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.personalDataService.hasRole(2);
  }
}
