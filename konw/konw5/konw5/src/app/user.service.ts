import { Injectable } from '@angular/core'
import { UserTypes } from './user-types.enum'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}
  getUserType() {
    return UserTypes.editor
  }
}
