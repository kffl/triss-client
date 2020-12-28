import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { LocalStorageService } from '../LocalStorageService';


@Injectable()
export class WildaService implements CanActivate {

  constructor(private localStorageService: LocalStorageService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.localStorageService.personalData.employeeType === 1;
    //return this.localStorageService.personalDataSubject.getValue().employeeType === 1;
  }
}
