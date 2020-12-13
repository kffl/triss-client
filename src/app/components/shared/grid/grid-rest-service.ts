import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageInfo } from '../../../extra/app-grid-models/models';
import {SafeHttpClient} from '../security/SafeHtppClient';




@Injectable()
export class GridRestService {

    constructor(private http: SafeHttpClient)
    {}

    getFlux(url: string, pageInfo: PageInfo): Observable<any> {
      return this.http.post<any>(url, pageInfo);
    }

    getMono(url: string, pageInfo: PageInfo): Observable<any> {
      return this.http.post<any>(url, pageInfo);
    }

}
