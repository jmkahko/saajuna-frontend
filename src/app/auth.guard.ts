import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() { // Token löytyy jolloin Guard palauttaa true
        if (sessionStorage.getItem('accesstoken')) {
            return true;
        }

        // Jos tokenia ei ole palataan etusivulle
        this.router.navigate(['/']);
        return false;
    }
}
