import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PersonalDataInterface} from '../extra/personal-data-interface/personal-data.interface';
import {find} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  constructor() { }

  private personalDataSubject = new BehaviorSubject<PersonalDataInterface>(null);

  set personalData(value: PersonalDataInterface) {
    this.personalDataSubject.next(value);
  }

  getPersonalData = () => this.personalDataSubject.pipe(find(personalData => personalData != null));

  hasRole(role: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.getPersonalData().subscribe(personalData => {
        observer.next(personalData.employeeType === role);
        observer.complete();
      });
    });
  }
}
