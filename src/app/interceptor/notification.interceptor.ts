import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '@app/services/notification.service';
import { EMPTY } from 'rxjs';
@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
    count;
    navigation = [];
    constructor(
        private notificationService: NotificationService,
    ) {
        this.count = 0;
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.count === 1 && request.url.includes('GetCountTicket')){
            this.count = 0;
            return EMPTY;
        }

        if (request.url.includes('GetCountTicket')){
            this.count++;
        }

        if (localStorage.getItem('userId') && localStorage.getItem('userId')){
            this.notificationService.getCountTicket().then(res => {
                this.notificationService.setNotificationCount(res);
            });
        }
        
        return next.handle(request);
    }
}
