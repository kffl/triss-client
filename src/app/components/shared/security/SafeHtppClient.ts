import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SecurityService} from './SecurityService';


@Injectable()
export class SafeHttpClient {

  constructor(private http: HttpClient,
              private securityService: SecurityService) {}

  public post<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    const result = this.http.post<T>(url, body, options);
    result.subscribe(
      (data) => {
      },
      (error) => {
        if (error.status === 0) {
          this.securityService.redirectToELogin();
        }
        console.log(error.status);
      });
    return result;
  }
}
