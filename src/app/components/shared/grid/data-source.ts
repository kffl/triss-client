import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {PageInfo} from '../../../extra/app-grid-models/models';
import {GridRestService} from './grid-rest-service';

export class CustomDataSource implements DataSource<any> {

  private rowSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private restService: GridRestService) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.rowSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.rowSubject.complete();
        this.loadingSubject.complete();
    }

    public loadData(url: string, pageInfo: PageInfo) {
        if (url === undefined) {
          return;
        }
        //this.rowSubject.next([]);

        this.loadingSubject.next(true);
        this.restService.getFlux(url, pageInfo).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
        ).subscribe(rows => {
          const currentValue = this.rowSubject.value;
          const updatedValue = [...currentValue, rows];
          this.rowSubject.next(updatedValue);
          console.log(rows);
        });
    }
}
