import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() title = ''
  @Output() okClicked = new EventEmitter()

  constructor(private api: ApiService) {}

  onOk(cardTitle: string) {
    this.okClicked.emit(cardTitle)
  }
  getUserData() {
    this.api.get('asd')
  }
}
