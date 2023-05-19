import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WithCloseDialog } from 'src/app/models/with-close-dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: WithCloseDialog,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('[ConfirmGuard] canDeactivate')
    return component.openDeactivateDialog()
  }

}
