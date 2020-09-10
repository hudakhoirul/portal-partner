import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Config from '@fuse/services/api.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Injectable()
export class NotificationService
{
    constructor(
        private _httpClient: HttpClient,
        private _fuseNavigationService: FuseNavigationService) {

    }
    getCountTicket(): Promise<any> {
        return new Promise((resolve, reject) => {
                this._httpClient.get(Config.API_GET_COUNT_TICKET + '?userId=' + localStorage.getItem('userId') + '&roleId=' + localStorage.getItem('roleId'))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    setNotificationCount(res): void {
        const current = this._fuseNavigationService.getCurrentNavigation();

        current.map(value => {
            if (value.children && value.title.toLowerCase() === 'inbox') {
                value.badge = {
                    title: res.data.inboxETD + res.data.inboxPart + res.data.inboxPrice + res.data.inboxClaim,
                    bg: '#F44336',
                    fg: '#FFFFFF'
                };
                value.children.map(child => {
                    if (child.url === '/inbox/estimatetimedelivery') {
                        child.badge = {
                            title: res.data.inboxETD,
                            bg: '#F44336',
                            fg: '#FFFFFF'
                        };
                    } else if (child.url === '/inbox/partinfo') {
                        child.badge = {
                            title: res.data.inboxPart,
                            bg: '#F44336',
                            fg: '#FFFFFF'
                        };
                    } else if (child.url === '/inbox/priceinfo') {
                        child.badge = {
                            title: res.data.inboxPrice,
                            bg: '#F44336',
                            fg: '#FFFFFF'
                        };
                    } else if (child.url === '/inbox/claiminfo') {
                        child.badge = {
                            title: res.data.inboxClaim,
                            bg: '#F44336',
                            fg: '#FFFFFF'
                        };
                    }
                });
            }
            
                    
            // if (value.title.toLowerCase() === 'inbox'){
            //     value.badge = {
            //         title: res.inbox,
            //         bg: '#F44336',
            //         fg: '#FFFFFF'
            //     };
            // }
        });
        
        localStorage.setItem('auth', JSON.stringify(current));
        this._fuseNavigationService.unregister('main');
        this._fuseNavigationService.register('main', current);
        this._fuseNavigationService.setCurrentNavigation('main');
    }

    // getCountTicketMock(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get('http://localhost:3000/ticket-part')
    //             .subscribe((response: any) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }


}
