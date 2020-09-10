import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthenticationService} from '@app/core';


@Injectable({providedIn: 'root'})
export abstract class BaseService {

    protected constructor(protected http: HttpClient,
                          protected auth: AuthenticationService) {
    }

    protected getAPI<T>(url: string, reload?: boolean): Observable<T> {
        return this.http.cache(reload).get<T>(`${url}`, {
            headers: this.optionHeaders()
        }).pipe(tap(),
            catchError(this.handleError()));
    }

    protected postAPI<T>(url: string, data: any, bodyMimeType?: any): Observable<T> {
        return this.http.post<T>(`${url}`, data, {
            headers: this.optionHeaders(bodyMimeType)
        }).pipe(tap(),
            catchError(this.handleError()));
    }

    protected putAPI<T>(url: string, data: any, bodyMimeType?: any): Observable<T> {
        return this.http.put<T>(`${url}`, data, {
            headers: this.optionHeaders(bodyMimeType)
        }).pipe(tap(),
            catchError(this.handleError()));
    }

    protected deleteAPI<T>(url: string): Observable<T> {
        return this.http.delete<T>(`${url}`, {
            headers: this.optionHeaders()
        }).pipe(tap(),
            catchError(this.handleError()));
    }

    protected handleError(): any {
        return (error: HttpErrorResponse): Observable<any> => {
            let errorMessage = 'Server Error';

            if (!!error.error.errors) {
                errorMessage = '';
                Object.keys(error.error.errors).forEach(key => {
                    for (const msg of error.error.errors[key]) {
                        errorMessage += `*${msg}<br/>`;
                    }
                });
            } else if (!!error.error.result) {
                errorMessage = '';
                Object.keys(error.error.result).forEach(key => {
                    for (const msg of error.error.result[key]) {
                        errorMessage += `*${msg}<br/>`;
                    }
                });
            } else if (!!error.error.hint) {
                errorMessage = error.error.hint;
            } else if (!!error.error.message) {
                errorMessage = error.error.message;
            } else if (!!error.message) {
                errorMessage = error.message;
            }

            if (error.status === 401) {
                /*
                TODO: handle for no access to API
                 */
            }

            return throwError(errorMessage);

        };
    }

    protected optionHeaders(bodyMimeType ?: string): HttpHeaders {
        let headers = new HttpHeaders({
            'Accept': 'application/json, text/plain, */*'
        });
        if (!!bodyMimeType) {
            headers = headers.append('Content-Type', bodyMimeType);
        } else {
            headers = headers.append('Content-Type', 'application/json');
        }
        /*
        TODO: put here Authentication of API Service
         */
        return headers;
    }

}
