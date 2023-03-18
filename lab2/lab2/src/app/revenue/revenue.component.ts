import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent {
  @Input() title!: string
  @Input() value!: number
  @Input() color = '#000'
  @Input() icon = 'someDefIcon'

}
