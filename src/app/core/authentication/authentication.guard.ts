import {Injectable} from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import {Logger} from '../logger.service';
import {AuthenticationService} from './authentication.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthenticationService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // console.log('cek')
        // if (!localStorage.getItem('portal_company_id')) {
        //     this.router.navigate(['/login']);
        //     return false;
        // }
    
        return true;
    }

}
