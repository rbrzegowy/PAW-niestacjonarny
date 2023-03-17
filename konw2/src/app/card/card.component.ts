import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title = "Domyślny pusty tytuł"
  @Input() content = "Domyślna pusta treść"
  @Output() okAction = new EventEmitter()
  @Output() cancelAction = new EventEmitter()

  onOk(event: any) {
    this.okAction.emit(this.title)
    console.log('ok clicked', event)
  }
  onCancel(event: any) {
    this.cancelAction.emit(this.title)
    console.log('cancel clicked', event)
  }
}
