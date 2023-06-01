import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tmg-dyrektywy',
  templateUrl: './dyrektywy.component.html',
  styleUrls: ['./dyrektywy.component.scss']
})
export class DyrektywyComponent {
  protected usersVisible = true
  protected listType: 'simple' | 'form' = 'form' // 'form'
  protected showUsers = false
  protected userList = [
    'shrek',
    'fiona',
    'osiol',
    'kot',
    'ptaszek co nie wytrzymał'
  ]

  onUsersToggle() {
    this.listType = this.listType === 'simple' ? 'form' : 'simple'
  }
  onUsersListToggle() {
    this.showUsers = !this.showUsers
  }
}
