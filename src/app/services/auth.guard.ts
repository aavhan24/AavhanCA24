import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     } else {
//       return this.router.createUrlTree(['/login']);
//     }
//   }
// }
canActivate(): boolean {
  // Check if the token exists in local storage
  const token = localStorage.getItem('token');
  if (token) {
    return true; // Allow access to the route
  } else {
    // If there's no token, redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
}