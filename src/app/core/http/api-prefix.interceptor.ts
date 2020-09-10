import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {environment} from '@env/environment';

/**
 * Prefixes all requests with `environment.server_url`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({url: environment.api_url + request.url});
        return next.handle(request);
    }

}
