import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageInfo } from './models';

@Injectable()
export class RestService {

    constructor(private http: HttpClient) {
        
    }

    // getApplicationRows(pageInfo: PageInfo): Observable<any[]> {
    //     return this.http.post<any[]>('http://localhost:8080/application/get', pageInfo)
    // }

    // getApplicationRowsCount() {}
}