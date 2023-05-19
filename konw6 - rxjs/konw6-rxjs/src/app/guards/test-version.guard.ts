import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap, timer } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TestVersionGuard implements CanMatch {
  constructor(private user: UserService) {}
  canActivate() {
    console.log('[guard] TestVersionGuard canActivate');
    return timer(1000).pipe(map(_ => true), tap(val => console.log('TestVersionGuard resolved to ' + val)))
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('[guard] TestVersionGuard canMatch');
    return this.user.isTestUser
  }

}
