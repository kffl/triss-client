import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PersonalDataInterface} from '../extra/personal-data-interface/personal-data.interface';
import {InstituteInterface} from '../extra/institute-interface/institute.interface';
import {FormData} from '../extra/request-interface/request-interface';
import {PageInfo} from '../extra/app-grid-models/models';
import {ActorEnum} from '../extra/actor-enum/actor-enum';
import {environment} from '../../environments/environment';

export interface Enum {
  value: number;
  namePl: string;
  nameEng: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  serverAddress = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  private getUrl(mapping: string): string {
    return this.serverAddress + mapping;
  }

  getApplication(actor: ActorEnum, rowId: number): Observable<FormData> {
    let mapping: string;
    switch (actor) {
      case ActorEnum.Employee: {
        mapping = '/user/application/getFull';
        break;
      }
      case ActorEnum.Director: {
        mapping = '/director/application/getFull';
        break;
      }
      case ActorEnum.Wilda: {
        mapping = '/wilda/application/getFull';
        break;
      }
      case ActorEnum.Rector: {
        mapping = '/rector/application/getFull';
        break;
      }
    }
    return this.http.post<FormData>(this.getUrl(mapping), rowId);
  }

  getFlux(actor: ActorEnum, pageInfo: PageInfo): Observable<any[]> {
    // const httpOptions = {
    //     headers: new HttpHeaders({
    //       Accept:  'application/stream+json',
    //       Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    //     })
    // };
    let mapping: string;
    switch (actor) {
      case ActorEnum.Employee: {
        mapping = '/user/application/get';
        break;
      }
      case ActorEnum.Director: {
        mapping = '/director/application/get';
        break;
      }
      case ActorEnum.Wilda: {
        mapping = '/wilda/application/get';
        break;
      }
      case ActorEnum.Rector: {
        mapping = '/rector/application/get';
        break;
      }
    }
    return this.http.post<any[]>(this.getUrl(mapping), pageInfo);
  }

  getMono(actor: ActorEnum, pageInfo: PageInfo): Observable<any> {
    // const httpOptions = {
    //     headers: new HttpHeaders({
    //       Accept:  'application/stream+json',
    //       Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    //     })
    // };
    let mapping: string;
    switch (actor) {
      case ActorEnum.Employee: {
        mapping = '/user/application/count';
        break;
      }
      case ActorEnum.Director: {
        mapping = '/director/application/count';
        break;
      }
      case ActorEnum.Wilda: {
        mapping = '/wilda/application/count';
        break;
      }
      case ActorEnum.Rector: {
        mapping = '/rector/application/count';
        break;
      }
    }
    return this.http.post<any>(this.getUrl(mapping), pageInfo);
  }

  getStatuses(): Observable<Enum[]> {
    const mapping = '/enum/status';
    return this.http.get<Enum[]>(this.getUrl(mapping));
  }

  getVehicles(): Observable<Enum[]> {
    const mapping = '/enum/vehicle';
    return this.http.get<Enum[]>(this.getUrl(mapping));
  }

  getDocumentTypes(): Observable<Enum[]> {
    const mapping = '/enum/documentType';
    return this.http.get<Enum[]>(this.getUrl(mapping));
  }

  getPaymentTypes(): Observable<Enum[]> {
    const mapping = '/enum/paymentType';
    return this.http.get<Enum[]>(this.getUrl(mapping));
  }

  getPersonalData(): Observable<PersonalDataInterface> {
    const mapping = '/employee/get';
    return this.http.post<PersonalDataInterface>(this.getUrl(mapping), {});
  }

  updatePersonalData(newPersonalData: PersonalDataInterface): Observable<PersonalDataInterface> {
    const mapping = '/employee/update';
    return this.http.post<PersonalDataInterface>(this.getUrl(mapping), newPersonalData);
  }

  getInstitutes(): Observable<InstituteInterface[]> {
    const mapping = '/institute/all';
    return this.http.get<InstituteInterface[]>(this.getUrl(mapping));
  }

  sendFormData(form: FormData): Observable<any> {
    const mapping = '/user/application/create';
    return this.http.post(this.getUrl(mapping), form);
  }

  approveAsDirector(form: FormData): Observable<any> {
    const mapping = '/director/application/approve';
    return this.http.post(this.getUrl(mapping), form);
  }

  approveAsWilda(form: FormData): Observable<any> {
    const mapping = '/wilda/application/approve';
    return this.http.post(this.getUrl(mapping), form);
  }

  approveAsRector(form: FormData): Observable<any> {
    const mapping = '/rector/application/approve';
    return this.http.post(this.getUrl(mapping), form);
  }

  rejectAsDirector(form: FormData): Observable<any> {
    const mapping = '/director/application/reject';
    return this.http.post(this.getUrl(mapping), form);
  }

  rejectAsWilda(form: FormData): Observable<any> {
    const mapping = '/wilda/application/reject';
    return this.http.post(this.getUrl(mapping), form);
  }

  rejectAsRector(form: FormData): Observable<any> {
    const mapping = '/rector/application/reject';
    return this.http.post(this.getUrl(mapping), form);
  }
}
