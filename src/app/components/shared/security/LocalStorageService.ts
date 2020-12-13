import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const roleKey = 'role';
const tokenKey = 'access_token';

@Injectable()
export class LocalStorageService{

    roleSubject = new BehaviorSubject(this.role);

    set role(value) {
        this.roleSubject.next(value);
        localStorage.setItem(roleKey, value);
    }
    get role() {
        return localStorage.getItem(roleKey);
    }

    tokenSubject = new BehaviorSubject(this.token);

    set token(value) {
      this.tokenSubject.next(value);
      localStorage.setItem(tokenKey, value);
    }
    get token() {
      return localStorage.getItem(tokenKey);
    }

}
