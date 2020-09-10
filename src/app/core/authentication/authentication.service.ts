import {Injectable} from '@angular/core';

const TOKEN_KEY = 'authToken';
const COMPANY_ID = 'company_id';
const USER = 'user';
@Injectable()
export class AuthenticationService {

    constructor() {
    }

    /*
    TODO: we can put auth for check user logged or not, role and workflow
   */

    setCompanyId(company_id): void { 
        window.sessionStorage.removeItem(COMPANY_ID);
        window.sessionStorage.setItem(COMPANY_ID,  company_id);
    }

    getCompanyId(): string | null {
        return sessionStorage.getItem(COMPANY_ID);
    }

    setToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY,  token);
    }

    getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    setUser(user): void { 
        window.sessionStorage.removeItem(USER);
        window.sessionStorage.setItem(USER,  JSON.stringify(user));
    }
    
    getUser(): string {
        return JSON.parse(sessionStorage.getItem(USER));
    }
    
    signOut(): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(COMPANY_ID);
        window.sessionStorage.removeItem(USER);
        window.sessionStorage.clear();
    }
    
}
