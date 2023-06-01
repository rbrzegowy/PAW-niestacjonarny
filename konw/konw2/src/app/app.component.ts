import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'konw2';
  userCardTitle = 'Karta użytkownika'
  userCardContent = 'Jakiś tam Jan Kowalski'
  cartCardTitle = 'Koszyk'
  cartCardContent = 'Dwie fajne ksiażki'
  questionFieldPlaceholder = 'Ask a question!'
  description = 'konw2 - opis';
  lastAction = ''


  onOk(cardTitle: any) {
    this.lastAction = 'OK from ' + cardTitle
    console.log('from app component - ok action', cardTitle);

  }
  onCancel(cardTitle: any) {
    this.lastAction = 'Cancel from ' + cardTitle
    console.log('from app component - cancel action', cardTitle);

  }
  onUserOk(title: string) {
    console.log(title)
  }
}
