import { Component } from '@angular/core';
import {CSS } from 'src/app/models/css.model'

@Component({
  selector: 'app-css-input',
  templateUrl: './css-input.component.html',
  styleUrls: ['./css-input.component.scss']
})
export class CssInputComponent {
  protected css: CSS = {
    color: undefined,
    border: undefined,
    'box-shadow': undefined,
    background: undefined
  }
  color = '#fff'
  background = '#444'

  protected onGenerateCSS() {
    console.log(this.css.color)
    this.css.color = 'czerwony'
  }
}
