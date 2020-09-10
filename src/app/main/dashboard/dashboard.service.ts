import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '@app/core/http/base.service';
import {AuthenticationService} from '@app/core';
import {Observable, Subject} from 'rxjs';

class SearchItem {
    constructor(
        public wrapperType: string,
        public kind: string,
        public artistId: string,
        public collectionId: string,
        public trackId: string,
        public artistName: string,
        public collectionName: string,
        public trackName: string
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseService {
    
    constructor(
        http: HttpClient,
        auth: AuthenticationService
    ) {
        super(http, auth);
    }

    getPromises(): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            const message = 'from promise';
            resolve(message);
        });
    }

    getObservables(): Observable<any>{
        return Observable.create(observer => {
            observer.next('from observable');
            observer.complete();
        });
    }
}
