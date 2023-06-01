import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageComponent } from 'src/app/app-components/message/message.component';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  private dashboardItems = [MessageComponent, MessageComponent, MessageComponent]

  constructor(private readonly rend: Renderer2) {}

  @ViewChild('dynamicDashboard', { read: ViewContainerRef }) dashboardVCR!: ViewContainerRef;

  //eslint-disable-next-line
  ngOnInit(): void {
    // jeśli chcesz mieć dostęp do viewContainerRef dynamicDashboardu PRZED afterViewInit 
    // udekoruj dynamicDashboard custom dyrektywą z wstrzykniętym w konstruktorze ViewContainerRef
  }

  ngAfterViewInit(): void {

  }

  onCreateWidgets() {
    for (let i = 0; i < this.dashboardItems.length; i++) {
      const componentRef = this.dashboardVCR.createComponent(this.dashboardItems[i]);
      componentRef.instance.title = 'Widget ' + i
      componentRef.instance.sentencesCount = 3

      console.log('com instance created')
      // componentRef.instance.action.subscribe
      console.log(componentRef.instance)
      console.log(componentRef.location.nativeElement)
    }
  }
  onClearDashboard() {
    this.dashboardVCR.clear()
  }
}
