import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputDisabled = false
  onInputChange(value: string) {
    // const value = (event.target as HTMLInputElement).value
    console.log(value);
  }
  onUserClick() {
    console.log('USER CLICKED!!!')
  }
}
