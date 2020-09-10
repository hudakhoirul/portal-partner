import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '@app/core/http/base.service';
import {RegisterClaimInterface, Itunes, Response} from '@app/main/register-claim/register-claim.interface';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '@app/core';
import {Observable} from 'rxjs';
import 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';

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
export class RegisterClaimService extends BaseService {

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

    getDataSource() {
        return new DataSource({
            store: {
                type: 'odata',
                url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
                beforeSend: function(request) {
                    request.params.startDate = '2018-05-10';
                    request.params.endDate = '2018-05-15';
                }
            }
        });
    }

}
