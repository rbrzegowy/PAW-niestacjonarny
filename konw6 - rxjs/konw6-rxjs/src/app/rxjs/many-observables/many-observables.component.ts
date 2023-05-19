import { Component, OnInit } from '@angular/core'
import { Subject, interval, share, scan, Observable, merge, zip, raceWith, map, zipWith, switchMap, combineLatestWith, tap, forkJoin, pipe, race, combineLatest, from, Subscription, of, takeWhile, takeUntil, exhaustMap, take, noop, concatMap, mergeMap, timeout, timer, fromEvent } from 'rxjs'


@Component({
  selector: 'app-many-observables',
  templateUrl: './many-observables.component.html',
  styleUrls: ['./many-observables.component.scss']
})
export class ManyObservablesComponent implements OnInit {
  protected interval900$ = interval(900).pipe(share())
  protected interval1600$ = interval(1600).pipe(share())
  protected interval3000$ = interval(3000).pipe(share())

  private btn1 = new Subject<number>()
  private btn1ClickCount = 0
  private btn2 = new Subject<number>()
  private btn3 = new Subject<number>()

  protected raceWith$!: Observable<string | number>
  protected zipWith$!: Observable<(string | number)[]>
  protected combineLatestWith$!: Observable<(string | number)[]>
  protected forkJoin$!: Observable<(string | number)[]>
  protected merge$!: Observable<(string | number)>
  protected switchMap$!: Observable<(string | number)>
  protected mergeMap$!: Observable<(string | number)>
  protected exhaustMap$!: Observable<(string | number)>
  protected concatMap$!: Observable<(string | number)>

  protected btn1$!: Observable<string | number>
  protected btn2$!: Observable<string | number>
  protected btn3$!: Observable<string | number>

  private destroy$ = new Subject<boolean>()

  private btnCounters = [0, 0, 0]
  private genericSub = new Subscription()
  constructor() {}

  // protected onBtnClick(btnNumber: 1 | 2 | 3) {
  //   const prefix = 'btn' + btnNumber
  //   const numb = this.btnCounters[btnNumber]++
  //   // const subject = `btn${btnNumber}`
  //   this[`btn${btnNumber}`].next(`${prefix}-${num}`)
  // }

  private onDocumentClick() {
    fromEvent(document, 'click')
  }


  ngOnInit(): void {
    // custom pipe z parametrem
    const sumujIWyswietl = (name: string) =>
      pipe(
        scan((acc: number, val: number) => acc += val),
        map(v => name + '-' + v),
      )


    // const convertToNumber = (obs: Observable<string>) => {
    //   const internalSubject = new Subject<number>()
    //   obs.subscribe(data => {
    //     internalSubject.next(+data)
    //   })
    //   return internalSubject.asObservable()
    // }


    // this.btn1$ = this.btn1.pipe(convertToNumber)
    this.btn1$ = this.btn1.pipe(sumujIWyswietl('btn1'))
    this.btn2$ = this.btn2.pipe(sumujIWyswietl('btn2'))
    this.btn3$ = this.btn3.pipe(sumujIWyswietl('btn3'))

    // this.btn1$
    //   .pipe(//...logika)
    //   .subscribe(() => {
    //     /// ... logika
    //     // logika per btn1
    //   }) 
    // this.btn2$.subscribe(() => {
    //     // logika per btn2
    //     /// ... logika
    //     // logika per btn2
    //   }) 
    // this.btn2$.subscribe(() => {
    //     /// ... logika
    //     // logika per btn1
    //   }) 
    const saveDoc$ = this.btn1$
    const postHttpData = this.btn2$
    const sub3 = saveDoc$
      .subscribe()


    // let sub: any
    // this.saveDoc$.subscribe({
    //   next: data => {
    //     sub = this.httpPost$.subscribe((d2) => {})
    //     sub.unsubscribe()
    //   },
    //   err: noop,
    //   complete: () => sub.unsubscribe()
    // })
    // this.raceWith$ = this.interval3000$.pipe(raceWith(this.btn1$))
    this.raceWith$ = race(this.interval3000$, this.btn1$)

    // this.zipWith$ = zip(this.btn1$, this.btn2$, this.btn3$)
    this.zipWith$ = zip(this.interval900$, this.interval1600$, this.interval3000$)
    // this.zipWith$ = this.interval900$.pipe(zipWith(this.interval1600$, this.interval3000$))

    this.combineLatestWith$ = this.btn1$.pipe(combineLatestWith(this.btn2$), tap(console.log))
    // this.combineLatestWith$ = combineLatest([this.btn1$, this.btn2$]).pipe(tap(console.log))

    this.forkJoin$ = forkJoin([this.btn1$, this.btn2$])

    this.merge$ = merge(this.btn1$, this.btn2$, this.btn3$)
    const mergeSub = this.merge$.subscribe()
    this.genericSub.add(mergeSub)

    this.switchMap$ = this.btn1$.pipe(
      switchMap(val => interval(1000).pipe(map(n => val + ' / ' + n))),
    )

    this.mergeMap$ = this.btn1$.pipe(
      mergeMap(val => interval(1000).pipe(map(n => val + ' / ' + n))))

    this.exhaustMap$ = this.btn2$.pipe(
      exhaustMap(val => interval(300).pipe(take(10), map(n => val + ' / ' + n))))

    this.concatMap$ = this.btn1$.pipe(concatMap((val) => interval(300).pipe(take(10), map(n => val + ' / ' + n))))

    const sub = this.btn1$.subscribe()
    this.genericSub.add(sub)



    // const sub12 = this.btn1$.pipe(takeUntil(this.destroy$)).subscribe()
    // const sub2 = this.btn1$.pipe(takeUntil(this.destroy$)).subscribe()
    // const sub33 = this.btn1$.pipe(takeUntil(this.destroy$)).subscribe()
    const sub12 = this.btn1$.pipe().subscribe()
    const sub2 = this.btn1$.pipe().subscribe()
    const sub33 = this.btn1$.pipe().subscribe()
    this.genericSub.add(sub12)
    this.genericSub.add(sub2)
    this.genericSub.add(sub33)


    // const saveBtn!: any
    // const httpPost!: any

    // let saveInProgress = false
    // saveBtn.pipe(
    //   tap((() => saveInProgress = true))
    //   switchMap(() => {
    //     if (!saveInProgress) {
    //       httpPost
    //     } else {
    //       of('')
    //     }
    //   })
    // )
    //   .subscribe(() => {
    //   saveInProgress = false
    // })

    // // vs
    // let tmpVal: any
    // this.switchMap$ = this.btn1$.pipe(
    //   tap(val => tmpVal = val),
    //   switchMap(val => interval(1000)),
    //   map(n => tmpVal + ' / ' + n)
    // )
    // setTimeout(() => {
    //   tmpVal = 'asdasd'
    // }, 900)
    // switchMap(val => interval(1000).pipe(map(n => n*100))))
  }

  onEmitClick(num: 1 | 2 | 3) {
    // this.btn1
    // this['btn1']

    this[`btn${num}`].next(1)
  }
  // lub
  // onEmitClick1() {
  //   this.btn1ClickCount++
  //   this.btn1.next(`btn1 - ${this.btn1ClickCount}`)
  // }
  // onEmitClick2() {
  //   this.btn2ClickCount++
  //   this.btn2.next(`btn1 - ${this.btn2ClickCount}`)
  // }
  // onEmitClick3() {
  //   this.btn3ClickCount++
  //   this.btn3.next(`btn1 - ${this.btn1ClickCount}`)
  // }
  // onEmitClick2() {
  //   this.btn2.next(1)
  // }
  // onEmitClick3() {
  //   this.btn3.next(1)
  // }

  onCompleteClick(num: 1 | 2 | 3) {
    this[`btn${num}`].complete()
  }
  tmp() {
    const obs = new Subject<Observable<any>>()
    obs.next(this.btn2$)
    const sub = obs
      .subscribe(data => {
        console.log(data)

      })
    // sub.unsubscribe()
  }
  ngOnDestroy() {
    this.destroy$.next(true)
    this.genericSub.unsubscribe()
  }
}
