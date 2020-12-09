import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class LocalStorageService{

    roleSubject = new BehaviorSubject(this.role);

    set role(value) {
        this.roleSubject.next(value);
        localStorage.setItem('role', value);
    }
     
    get role() {
        return localStorage.getItem('role');
    }

}