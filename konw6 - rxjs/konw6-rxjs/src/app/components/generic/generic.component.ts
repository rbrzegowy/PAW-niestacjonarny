import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class GenericComponent {
  @Input() title = 'Komponent generyczny'
  @Input() content = 'Lorem tego ipsum'
  @Output() ok = new EventEmitter()

  protected okClick(event: Event) {
    event.stopPropagation()
    this.ok.emit('ok clicked!')
  }
}
