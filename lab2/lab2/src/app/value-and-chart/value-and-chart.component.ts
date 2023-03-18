import { Component, Input } from '@angular/core';
import { ValueWithPreviousValue, ValueWithPercentChange } from './value.model';

@Component({
  selector: 'app-value-and-chart',
  templateUrl: './value-and-chart.component.html',
  styleUrls: ['./value-and-chart.component.scss']
})
export class ValueAndChartComponent {
  @Input() title!: string
  @Input() value!: ValueWithPreviousValue | ValueWithPercentChange
  @Input() color = '#000'
  @Input() icon = 'someDefIcon'

}
