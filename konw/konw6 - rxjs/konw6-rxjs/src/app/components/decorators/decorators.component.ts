import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { timer } from 'rxjs';
import { MessageComponent } from 'src/app/app-components/message/message.component';

// <app-decorators style="background-color: value" ></app-decorators>
@Component({
  selector: 'app-decorators',
  templateUrl: './decorators.component.html',
  styleUrls: ['./decorators.component.scss']
})
export class DecoratorsComponent implements AfterViewInit {

  @HostBinding('style.backgroundColor') backgroundColor!: string
  @HostBinding('class.valid') isValid = true
  @HostBinding('attr.tooltip') tooltip = 'Domyślny tooltip'

  @HostListener('mousemove', ['$event']) hostMouseMove(ev: MouseEvent) {
    const biasX = 100 - ev.clientX / screen.width * 100
    const biasY = ev.clientY / screen.height * 100
    this.backgroundColor = `hsl(200,${biasX}%,${biasY}%)`
  }
  @HostListener('window:click', ['$event']) windowClick(ev: MouseEvent) {
    console.log('Window click from decoratorsComponent!')
  }
  @HostListener('document:mousemove') lastCleanAction() {
    // user po prostu zamyka kartę
    // ngOnDestroy nie odpali
  }

  // dostępne dopiero w afterViewInit
  // popularne selektory : #name, dyrektywa, komponent, TemplateRef
  // read: wybór tokena do dostarczenia: TemplateRef, ElementRef, ViewContainerRef, 
  @ViewChild('sentenceBox') sentenceBox: MessageComponent | undefined
  @ViewChild('header') header: HTMLElement | undefined
  @ViewChild('sentenceBox', { read: ElementRef }) sentenceBoxRef: ElementRef<MessageComponent> | undefined

  @ViewChildren(MessageComponent) allSentenceBoxes: QueryList<MessageComponent> | undefined

  // dostępne po afterContentInit!
  //@ContentChild/@ContentChildren analogicznie do elementów z content - project

  constructor() {}


  ngAfterViewInit() {
    timer(8000).subscribe(() => this.isValid = false)
    // PEŁNY dostęp do komponentu dziecka
    console.log("Komponent", this.sentenceBox)
    // dostęp do nativeElement sentenceBox
    console.log("ElementRef.nativeElement", this.sentenceBoxRef?.nativeElement)
    // viewchild do native html - domyślnie jest ElementRef
    console.log("H2", this.header)
    // dostęp do nativeElement sentenceBox
    // wszystkie MessageComponent w widoku
    console.log(this.allSentenceBoxes)

  }

}
