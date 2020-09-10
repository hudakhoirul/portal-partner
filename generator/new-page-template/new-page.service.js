module.exports = function(names, params) {
    return `
        import {Injectable} from '@angular/core';
        import {HttpClient} from '@angular/common/http';
        import {BaseService} from '@app/core/http/base.service';
        import {${names.pascalCase}Interface} from '@app/main/${names.kebabCase}/${names.kebabCase}.interface';
        import {map} from 'rxjs/operators';
        import {AuthenticationService} from '@app/core';
        import {Observable} from 'rxjs';

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

        export interface Itunes {
            wrapperType: string;
            kind: string;
            artistId: string;
            collectionId: string;
            trackId: string;
            artistName: string;
            collectionName: string;
            trackName: string;
        }

        export interface Response {
            resultCount: number;
            results: Array<Itunes>;
        }

        @Injectable({
            providedIn: 'root'
        })
        export class ${names.pascalCase}Service extends BaseService {

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

            getTestApi(): Observable<SearchItem[]> {
                return this.http.get<Response>('https://itunes.apple.com/search?term=spotify&media=music&limit=20').pipe(
                    map(res => {
                        return res.results.map(item => {
                            return new SearchItem(
                                item.wrapperType,
                                item.kind,
                                item.artistId,
                                item.collectionId,
                                item.trackId,
                                item.artistName,
                                item.collectionName,
                                item.trackName,
                            );
                        });
                    })
                );
            }
        }
    `
}