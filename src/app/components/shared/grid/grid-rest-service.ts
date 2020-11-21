import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageInfo } from '../../../extra/app-grid-models/models';

@Injectable()
export class GridRestService {

    constructor(private http: HttpClient) {

    }

    getFlux(url: string, pageInfo: PageInfo): Observable<any[]> {
        return this.http.post<any[]>(url, pageInfo);
    }

    getMono(url: string, pageInfo: PageInfo): Observable<any> {
        return this.http.post<any>(url, pageInfo);
    }

}
