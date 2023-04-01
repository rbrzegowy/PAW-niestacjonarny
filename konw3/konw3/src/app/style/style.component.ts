import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'tmg-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor!: string
  @HostBinding('class.highlighted') highlighted = true

  protected buttonState = {
    active: true,
    primary: true
  }
  protected buttonNgClasses = { stat1: true, stat2: true, active: this.buttonState.active }

  protected buttonStyles = {
    color: 'red'
  }

  protected itemSelected = false
  protected fontSize!: string
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.buttonState.active = false
      this.highlighted = false
    }, 2000)
  }

  itemToggle() {
    this.itemSelected = !this.itemSelected
  }
  onInputChange(value: string) {
    this.fontSize = value
  }
  onBackgroundChange(value: string) {
    this.backgroundColor = value
  }
}
