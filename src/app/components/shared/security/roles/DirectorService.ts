import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { LocalStorageService } from '../LocalStorageService';


@Injectable()
export class DirectorService implements CanActivate {

  constructor(private localStorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.localStorageService.role === '2';
  }
}
