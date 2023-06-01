import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/services/user/user-roles.enum';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleAdminGuard implements CanActivate {
  constructor(private readonly user: UserService, private readonly router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const userIsAdmin = this.api.getUser()
    //   .pipe(
    //     map(() => this.user.isAdmin)
    // )
    // return userIsAdmin

    const userIsAdmin = this.user.getRole() === UserRole.Admin
    console.log('[UserAdminGuard]', userIsAdmin);
    return userIsAdmin
      ? true
      : this.router.createUrlTree(['login'])
    // this.router.navigate(['action-selection'], { state: { example: 'bar' } });
  }

}
