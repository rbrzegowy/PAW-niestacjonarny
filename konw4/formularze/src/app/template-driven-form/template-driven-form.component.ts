import { Component } from '@angular/core'

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.scss']
})
export class TemplateDrivenFormComponent {
  protected name = 0

  ngOnInit(): void {
    setInterval(() => {
      this.name = this.name + 1
    }, 1000)
  }
  onGetName() {
    console.log(this.name)
  }
}
