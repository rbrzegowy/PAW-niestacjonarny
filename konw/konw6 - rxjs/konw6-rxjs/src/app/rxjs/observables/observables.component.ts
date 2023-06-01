import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { AsyncSubject, fromEvent, BehaviorSubject, finalize, switchMap, tap, interval, noop, Observable, ReplaySubject, Subject, Subscriber, take, delay, timer, Subscription, map, takeUntil, timeout, lastValueFrom } from 'rxjs'

const EMIT_COUNT = 10

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit, OnDestroy {
  // Subject zamiast EventEmitter - taka ciekawostka:)
  @Output() event = new EventEmitter<string>()
  // @Output() event = new Subject()

  producer = (sub: Subscriber<string>) => {
    console.log('producer fired')
    const date = new Date().toLocaleTimeString()
    interval(1000).pipe(
      take(EMIT_COUNT))
      .subscribe({
        next: (n: number) => sub.next(`${date} - ${n}`),
        error: noop,
        complete: () => sub.complete()
      })
  }

  protected observable = new Observable(this.producer);


  protected subject = new Subject<string>();
  // protected behaviorSubject = new BehaviorSubject<string>(null);
  protected behaviorSubject = new BehaviorSubject('wartość domyślna');
  // dwie ostatnie wartości z max ostatnich 4s
  // protected replaySubject = new ReplaySubject<string>(1);
  protected replaySubject = new ReplaySubject<string>(2, 4000);
  protected asyncSubject = new AsyncSubject<string>();
  protected lateRs = ''

  protected showLateSubs = false;
  protected showOnCompleteSubs = false;

  private replaySub!: Subscription

  private genericSub = new Subscription()

  protected mappedSubject!: Observable<string>

  protected username!: string

  constructor() {
  }

  // async getAllAPIData() {
  //   const sub = this.subject.subscribe(data => {})
  //   sub.unsubscribe()
  //   return this.subject.forEach(data => {})
  // }

  ngOnInit(): void {
    // const allDataTaken = await this.getAllAPIData()

    let lastValue = null
    this.behaviorSubject
      .pipe(map(el => +el))
      .subscribe(d => lastValue = d)

    const date = new Date().toLocaleTimeString()
    interval(1000).pipe(
      delay(2000),
      take(EMIT_COUNT),
      finalize(() => {
        this.subject.complete()
        this.behaviorSubject.complete()
        this.replaySubject.complete()
        this.replaySubject.subscribe(data => console.log('Replay subject - sub po complete', data))
        this.asyncSubject.complete()
        this.showOnCompleteSubs = true
      })
    )
      .subscribe((n) => {
        const valueToEmit = `${date} - ${n}`
        this.subject.next(valueToEmit)
        this.behaviorSubject.next(valueToEmit)
        this.replaySubject.next(valueToEmit)
        this.asyncSubject.next(valueToEmit)

        // this.event.emit(valueToEmit)
        this.event.next(valueToEmit) //EventEmitter 😲

        // if (n === EMIT_COUNT - 1) {
        //   this.subject.complete();
        //   this.behaviorSubject.complete();
        //   this.replaySubject.complete();
        //   this.asyncSubject.complete();
        //   this.showOnCompleteSubs = true
        // }
      })
    // 😠 brak unsub-a, do dodania switchMapa
    timer(7000).subscribe(() => {
      this.replaySubject.subscribe(d => {
        this.showLateSubs = true
        console.log('Sub do ReplaySubject(2, 4s) po 5s: ', d)
        this.lateRs = d
      })
    })

    // poprawnie, bez sub-a w sub-ie:
    // const sub = timer(7000)
    //   .pipe(
    //     switchMap(() => this.replaySubject),
    //     tap((d) => {
    //       this.showLateSubs = true
    //       console.log('Sub do ReplaySubject(2, 4s) po 5s: ', d)
    //     }))
    //   .subscribe(d => {
    //     this.lateRs = d
    //   })
    // this.genericSub.add(sub)


    const a = this.subUsingForEach()
  }

  subUsingForEach() {
    console.log('[START] Emisja behaviorSubject z .forEach')
    const a = new Array(5, 2)
    // this.behaviorSubject.subscribe({
    //   next: (val) => console.log(`Emisja behaviorSubject z .forEach: `, val),
    //   error: (err) => {},
    //   complete: () => { console.log('[KONIEC] Emisja behaviorSubject z .forEach') }
    // }
    // )
    // await this.behaviorSubject.forEach(
    //   val => console.log(`Emisja behaviorSubject z .forEach: `, val)
    // )
    console.log('[KONIEC] Emisja behaviorSubject z .forEach')


  }

  protected onCompleteAsyncSubject() {
    this.asyncSubject.complete()
  }
  ngOnDestroy(): void {
    this.genericSub.unsubscribe()
    this.replaySub?.unsubscribe()
  }

  async A() {
    // this.behaviorSubject
    //   .pipe(take(1))
    //   .subscribe(val => this.behValue = val)
    const behValue = this.behaviorSubject.value
    console.log(behValue)

  }

  async B() {
    await this.A()
    console.log('c')
  }

}
