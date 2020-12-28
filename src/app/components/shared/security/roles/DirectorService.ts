import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LocalStorageService} from '../LocalStorageService';


@Injectable()
export class DirectorService implements CanActivate {

  constructor(private localStorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.localStorageService.personalData.employeeType === 2;
    // return this.localStorageService.personalDataSubject.getValue().employeeType === '2';
  }
}
