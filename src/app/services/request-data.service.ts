import {Injectable} from '@angular/core';
import {FormData, FormWithStatus} from '../extra/request-interface/request-interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestDataService {

  private formSource = new BehaviorSubject<FormWithStatus>(null);
  form = this.formSource.asObservable();

  setCurrentForm(formWithStatus: FormWithStatus) {
    this.formSource.next(formWithStatus);
  }
}
