import {Injectable} from '@angular/core';
import {Enum, RestService} from './rest-service';
import {BehaviorSubject} from 'rxjs';
import {InstituteInterface} from '../extra/institute-interface/institute.interface';
import {find, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestDataService {

  private institutesSubject = new BehaviorSubject<InstituteInterface[]>(null);
  private statusesSubject = new BehaviorSubject<Enum[]>(null);
  private vehiclesSubject = new BehaviorSubject<Enum[]>(null);
  private documentTypesSubject = new BehaviorSubject<Enum[]>(null);
  private paymentTypesSubject = new BehaviorSubject<Enum[]>(null);

  constructor(
    private restService: RestService
  ) {
    this.restService.getInstitutes().pipe(first()).subscribe(institutes => this.institutesSubject.next(institutes));
    this.restService.getEnumGroup().pipe(first()).subscribe(enumGroup => {
      this.statusesSubject.next(enumGroup.statuses);
      this.vehiclesSubject.next(enumGroup.vehicles);
      this.documentTypesSubject.next(enumGroup.documentTypes);
      this.paymentTypesSubject.next(enumGroup.paymentTypes);
    });
  }

  setInstitutes(institutes: InstituteInterface[]) {
    this.institutesSubject.next(institutes);
  }

  getInstitutes = () => this.institutesSubject.pipe(find(institutes => institutes != null));

  getStatuses = () => this.statusesSubject.pipe(find(statuses => statuses != null));

  getVehicles = () => this.vehiclesSubject.pipe(find(vehicles => vehicles != null));

  getDocumentTypes = () => this.documentTypesSubject.pipe(find(documentTypes => documentTypes != null));

  getPaymentTypes = () => this.paymentTypesSubject.pipe(find(paymentTypes => paymentTypes != null));


  formatDate(date: Date): string {
    return date ?
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : null;
  }

  formatSelect(value: number): number {
    if (value == null) {
      return null;
    }
    return value;
  }

  formatInput(str: string): string {
    const trimmed = str.trim();
    if (trimmed === '') {
      return null;
    }
    return trimmed;
  }

  getNumberFromInput(str: string): number {
    let num: number;
    if (!str || str.length === 0) {
      return null;
    }
    if (str.includes(',') || str.includes('.')) {
      num = parseFloat(str.replace(',', '.'));
    } else {
      num = parseInt(str, 10);
    }
    if (isNaN(num)) {
      return null;
    }
    return num;
  }

  getNumberLimited(str: string, maxValue: number): string {
    const num = this.getNumberFromInput(str);
    return num == null ? '' : String(num > maxValue ? maxValue : num);
  }
}
