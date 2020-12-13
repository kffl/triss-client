import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, finalize, map, take, tap} from 'rxjs/operators';
import {PageInfo} from '../../../extra/app-grid-models/models';
import {RestService} from '../../../services/rest-service';
import {ActorEnum} from '../../../extra/actor-enum/actor-enum';

export class CustomDataSource implements DataSource<any> {

    private rowSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private restService: RestService) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.rowSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.rowSubject.complete();
        this.loadingSubject.complete();
    }

    public loadData(actor: ActorEnum, pageInfo: PageInfo) {
        this.loadingSubject.next(true);
        this.restService.getFlux(actor, pageInfo).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
        ).subscribe(rows => {
            this.rowSubject.next(rows);
        });
    }
}
