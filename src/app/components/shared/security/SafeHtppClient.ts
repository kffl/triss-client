import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SecurityService} from './SecurityService';


@Injectable({
  providedIn: 'root'
  })
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
    // TODO : this would be helpful, when we will want to response in Flux, not Mono<List<ApplicationRow>>, so i would like to have this here
    // return new Observable<T>((observer) => {
    //
    //   const eventSource = new EventSource(url);
    //   eventSource.onmessage = (event) => {
    //     console.log('Received event: ', event);
    //     const json = JSON.parse(event.data);
    //     console.log('json' + json);
    //     // observer.next(new Quote(json['id'], json['book'], json['content']));
    //   };
    //   eventSource.onerror = (error) => {
    //     if (eventSource.readyState === 0) {
    //       console.log('The stream has been closed by the server.');
    //       eventSource.close();
    //       observer.complete();
    //     } else {
    //       observer.error('EventSource error: ' + error);
    //     }
    //   };
    // });
    //
    const result = this.http.post<T>(url, body, options);
    result.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        if (error.status === 0 || error.status === 401) {
          this.securityService.redirectToELogin();
        }
        console.log(error.status);
      });
    return result;
  }

  get<T>(url: string, options?: {
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

    const result = this.http.get<T>(url, options);
    result.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        if (error.status === 0 || error.status === 401) {
          this.securityService.redirectToELogin();
        }
        console.log(error.status);
      });
    return result;
  }
}
