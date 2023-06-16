import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  @Output() messageState = new EventEmitter<boolean>()

  showMessage = false;

  constructor() {}

  ngOnInit(): void {
  }

  onToggleMessage() {
    this.showMessage = !this.showMessage
    this.messageState.emit(this.showMessage)
  }
}
