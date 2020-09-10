import { Component, OnInit, ViewEncapsulation, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { FuseNavigation } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { NotificationService } from '@app/services/notification.service';
import {ToastrService} from 'ngx-toastr';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';
import { DataService } from '@app/_shared/crud-service/data.service';
import { ClaimStatus } from '@app/_models/claim';
import { Auth, Modul } from '@app/_models/master';
import { AuthenticationService } from '@app/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    navigation = [];
    claimStatus: ClaimStatus[] = [];
    modul: Modul[] = [];

    user: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private _fuseNavigationService: FuseNavigationService,
        private DS: DataService,
        private CD: ChangeDetectorRef,
        private authenticationService: AuthenticationService,
        private translate: TranslateService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
        
        localStorage.clear();
        this.authenticationService.signOut();
    }

    onClick(): void {
        this.DS.createObs(Auth, this.loginForm.getRawValue())
        .subscribe(
            (res: Auth[]) => {
                this.user = res;
                this.navigation = [
                    {
                        ID: '998',
                        name: 'Home',
                        icon: 'home',
                        url: '/home'
                    }
                ];
                // this.navigation = [
                //     {
                //         ID: '1',
                //         name: 'Home',
                //         icon: 'home',
                //         url: '/home'
                //     }, {
                //         ID: '2',
                //         name: 'Registration New Claim',
                //         icon: 'create_new_folder',
                //         url: '/register-claim'
                //     }, {
                //         ID: '3',
                //         name: 'List Outstanding',
                //         icon: 'list_alt',
                //         url: ''
                //     }, 
                //     {
                //         ID: '4',
                //         name: 'Claim Inquiry',
                //         icon: 'insert_drive_file',
                //         url: '/claim-inquiry'
                //     }, {
                //         ID: '5',
                //         name: 'Logout',
                //         icon: 'exit_to_app',
                //         url: '/login'
                //     }
                // ];

                this.authenticationService.setToken(this.user.token);
                this.authenticationService.setCompanyId(this.user.data.user.companyId);
                this.authenticationService.setUser(this.user.data.user);
        
                this.getModul(this.user.data.user.groupId);
            }, err => {
                notify('The username or password is incorrect', 'error', 600);
            });

    }
    
    // getClaimStatus(): Subscription {
    //     return this.DS.readObs(ClaimStatus)
    //         .subscribe(
    //             (res: ClaimStatus[]) => {
    //                 this.claimStatus = res['data'];
    //                 this.claimStatus.map((data, index) => {
    //                     console.log('data ', data)
    //                     if (data['parent']) {
    //                         this.navigation.push({
    //                             ID: data['id'],
    //                             name: data['name'],
    //                             icon: data['icon'],
    //                             url: data['uri'],
    //                             claimStatusCode: data['claimStatusCode']
    //                         });
    //                     } else {
    //                         this.navigation.push({
    //                             ID: `${data['parent']}_${data['id']}`,
    //                             categoryId: data['parent'],
    //                             name: data['name'],
    //                             icon: data['icon'],
    //                             url: this.generateUrl(data['name']),
    //                             claimStatusCode: data['claimStatusCode']
    //                         });
    //                     }
    //                 });

    //                 localStorage.setItem('portal_nav', JSON.stringify(this.navigation));
            
    //                 this._fuseNavigationService.unregister('main');
    //                 this._fuseNavigationService.register('main', this.navigation);
            
    //                 this.router.navigate(['dashboard']);
            
    //                 this.CD.detectChanges();
    //             },
    //             err => console.error(err),
    //         );
    // }

    getIcon(name): String {
        switch (name) {
            case 'Draft': {
                return 'drafts';
            }
            case 'Document Checking': {
                return 'check_box';
            }
            case 'Claim Revision': {
                return 'rate_review';
            }
            case 'Waiting Claim Amount': {
                return 'hourglass_empty';
            }
            case 'Claim Processed': {
                return 'sync';
            }
            case 'Claim Process on Core System': {
                return 'insert_drive_file';
            }
            default: {
                return 'empty';
            }
        }
    }

    generateUrl(name): String {
        return '/outstanding/' + name.toLowerCase().replace(/\s/g, '-');
    }

    getModul(groupId): Subscription {
        return this.DS.readObs(Modul, {
            group_id: groupId
        })
            .subscribe(
                (res: Modul[]) => {
                    this.modul = res['data'];
                    this.modul.map((data, index) => {
                        if (!data['parent']) {
                            this.navigation.push({
                                ID: data['id'],
                                name: data['name'],
                                icon: data['icon'],
                                url: this.getUri(data['name']),
                                claimStatusCode: data['claimStatusCode']
                            });
                        } else {
                            this.navigation.push({
                                ID: `${data['parent']}_${data['id']}`,
                                categoryId: data['parent'],
                                name: data['name'],
                                icon: data['icon'],
                                url: this.generateUrl(data['name']),
                                claimStatusCode: data['claimStatusCode']
                            });
                        }
                    });

                        
                    this.navigation.push({
                        ID: '999',
                        name: 'Logout',
                        icon: 'exit_to_app',
                        url: '/login'
                    });

                    localStorage.setItem('portal_nav', JSON.stringify(this.navigation));
            
                    this._fuseNavigationService.unregister('main');
                    this._fuseNavigationService.register('main', this.navigation);

                    this.CD.detectChanges();
                    
                    this.router.navigate(['dashboard']);
            
                    this.CD.detectChanges();
                },
                err => console.error(err),
            );
    }

    getUri(name): string {
        switch (name) {
            case 'Registration New Claim': {
                return '/register-claim';
            }
            case 'Claim Inquiry': {
                return '/claim-inquiry';
            }
            default: {
                return '';
            }
        }
    }
}
