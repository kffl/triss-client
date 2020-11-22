import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageInfo } from '../../pages/requests/models';



  
@Injectable()
export class GridRestService {

    constructor(private http: HttpClient) {
        
    }

    

    getFlux(url: string, pageInfo: PageInfo): Observable<any[]> {
        const httpOptions = {
            headers: new HttpHeaders({
              Accept:  'application/stream+json',
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            })
        };

        return this.http.post<any[]>(url, pageInfo, httpOptions)
    }

    getMono(url: string, pageInfo: PageInfo): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
              Accept:  'application/stream+json',
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            })
        };
        
        return this.http.post<any>(url, pageInfo, httpOptions);
    }

}