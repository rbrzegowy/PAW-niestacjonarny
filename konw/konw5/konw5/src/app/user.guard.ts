import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const random = Math.random()
    // console.log(random)
    // return random > 0.5
    const loggedUserType = this.userService.getUserType()
    const allowedUsers = route.data['allowedUsers']
    const isUserAllowed = allowedUsers.some((el: any) => el === loggedUserType)

    return isUserAllowed
  }

}
