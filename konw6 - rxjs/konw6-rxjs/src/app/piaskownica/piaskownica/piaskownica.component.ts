import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { NavigationCancel, Router } from '@angular/router'
import { observeOn, concatMap, asyncScheduler, take, fromEvent, map, scan, switchMap, auditTime, throttleTime, sampleTime, pluck, pipe, Subject, Subscription, debounceTime, tap, timer, zip, filter, interval, forkJoin, Observable, BehaviorSubject, timeout, of, from, animationFrameScheduler, Subscriber, share, shareReplay, concat, defer, delay, distinctUntilChanged, empty, mapTo, merge, mergeMap, switchAll, EMPTY, catchError } from 'rxjs'

@Component({
  selector: 'app-piaskownica',
  templateUrl: './piaskownica.component.html',
  styleUrls: ['./piaskownica.component.scss']
})
export class PiaskownicaComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  protected taskStates: Record<number, boolean> = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  }
  @Input()
  private _wartosc1 = 0;
  public get wartosc1() {
    return this._wartosc1
  }
  public set wartosc1(value) {
    this._wartosc1 = value
    // this.wyliczSumaInputow()
  }
  @Input()
  private _wartosc2 = 0;
  public get wartosc2() {
    return this._wartosc2
  }
  public set wartosc2(value) {
    this._wartosc2 = value
    // this.wyliczSumaInputow()
  }
  @Input() wartosc3 = 0

  @ViewChild('searchBox') searchBox: ElementRef<HTMLInputElement> | undefined

  @ViewChild('saveInput') saveInput: ElementRef<HTMLInputElement> | undefined
  @ViewChild('saveIndicator') saveIndicator: ElementRef<HTMLDivElement> | undefined

  protected formattedHistory$!: Observable<string>

  private genericSub = new Subscription();
  private sumaInputow!: number
  protected searchSaveStatus$: Observable<string | undefined> | undefined
  protected saveStatus$: Observable<string> | undefined

  protected coldHttpPost = new Observable()
  constructor(private readonly router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['wartosc1'] || changes['wartosc2'] || changes['wartosc3']) {
      this.sumaInputow = this.wartosc1 + this.wartosc2 + this.wartosc3
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.loadTaskStatesFromSessionStorage()
  }

  ngAfterViewInit() {
    Object.entries(this.taskStates)
      .forEach(([task, shouldRun]) => {
        if (shouldRun) {
          this.runTask(+task)
        }
      })
  }
  private zadanie1() {
    // koordynaty myszy
    const logujKoordynaty = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        map(ev => `${ev.clientX} / ${ev.clientY}`),
        // tap(console.log),
      )
      .subscribe(console.log)

    this.genericSub.add(logujKoordynaty)
  }

  private zadanie2() {
    // koordynaty myszy - wersja "co 1s"
    const sub1 = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        sampleTime(1000),
        map(ev => `${ev.clientX} / ${ev.clientY}`),
      )
      .subscribe(console.log)
    this.genericSub.add(sub1)






    // wersja "cisza od 2s i x > 500"
    // const sub2 = fromEvent<MouseEvent>(document, 'mousemove')
    //   .pipe(
    //     debounceTime(2000),
    //     filter((mouseEvent) => mouseEvent.clientX > 500),
    //     map(({ clientX, clientY }) => `${clientX} / ${clientY}`),
    //   )
    //   .subscribe(console.log)
    // this.genericSub.add(sub2)


    // wersja "co 2s raportuj położenie, nieważne czy się zmienia czy nie"
    // const sub3 = fromEvent<MouseEvent>(document, 'mousemove')
    //   .pipe(
    //     switchMap(
    //       (mouseEvent: MouseEvent) => interval(2000).pipe(
    //         filter(() => mouseEvent.clientX > 500),
    //         map(() => `${mouseEvent.clientX} / ${mouseEvent.clientY}`))
    //     )
    //   )
    //   .subscribe(console.log)
    // this.genericSub.add(sub3)


    // wersja "po co mi pipes" (wersja 2s i x>500)
    // let timeout!: ReturnType<typeof setTimeout>;
    // const sub4 = fromEvent<MouseEvent>(document, 'mousemove')
    //   .subscribe(ev => {
    //     if (ev.clientX <= 500) {
    //       return
    //     }
    //     if (timeout) {
    //       clearTimeout(timeout)
    //     }
    //     timeout = setTimeout(() => {
    //       const coords = `${ev.clientX} / ${ev.clientY}`
    //       console.log(coords)
    //     }, 2000)

    //   })
    // this.genericSub.add(sub4)

  }
  private zadanie3() {
    const randomVote = pipe(
      map(() => Math.random() >= 0.5 ? 'za' : 'przeciw')
    )
    // głosowanie
    const vote1 = timer(1000).pipe(randomVote)
    const vote2 = timer(3000).pipe(randomVote)
    const vote3 = timer(2000).pipe(randomVote)

    const sub = forkJoin([vote1, vote2, vote3]) // zip, combineLatest
      // wyniki: [vote1, vote2, vote3]
      .pipe(
        map(wyniki => 'Wyniki głosowania: ' + wyniki.join(', ')),
      )
      .subscribe(console.log)
    this.genericSub.add(sub)
  }
  private zadanie4() {
    if (!this.searchBox) { return }

    type SearchData = { history: string[], current: string }

    const searchData$ = fromEvent(this.searchBox.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        // map(() => this.searchBox.nativeElement.value)
        map(ev => (ev.target as HTMLInputElement).value),
        filter(val => val !== ''),
        // filter(val => val != ''),
        // filter(val => !!val),
        // filter(Boolean),
        scan((acc: SearchData, val: string) => ({
          history: [...acc.history, val],
          current: val
        }), { history: [], current: '' }),
      )

    const sub = searchData$.subscribe(console.log)
    this.genericSub.add(sub)


    // // gdybym potrzebował historii niezależnie od emisji ostatniej wartości
    const onlyHistory$ = searchData$.pipe(map(data => data.history))
    this.formattedHistory$ = onlyHistory$.pipe(map(data => data.join(', ')))

    // AUTOSAVE
    // mock procesu zapisu
    const saveProcess$ = timer(2000).pipe(
      map(() => 'server response'),
      // catchError(() => {})
    )

    // aktualny status procesu zapisu
    const status$ = new Subject<string>()

    let savesCounter = 0

    const saveProcess = pipe(
      tap(() => status$.next('Trwa zapisywanie')),
      tap(() => savesCounter++),
      mergeMap(() => saveProcess$),
      tap(() => savesCounter--)
    )
    const showSavedMessage = pipe(
      filter(() => savesCounter === 0),
      tap(() => status$.next('Zapisano')),
      switchMap(() => timer(2000)),
    )
    const showSavedDateMessage = pipe(
      filter(() => savesCounter === 0),
      tap(() => {
        const date = new Date().toLocaleString()
        status$.next(date)
      })
    )
    const autosave$ = searchData$.pipe(
      saveProcess,
      showSavedMessage,
      showSavedDateMessage
    )
    // bez custom pipe
    // const autosave$ = searchData$.pipe(
    //   tap(() => status$.next('Trwa zapisywanie')),
    //   tap(() => savesCounter++),
    //   mergeMap(() => saveProcess$),
    //   tap(() => savesCounter--),
    //   filter(() => savesCounter === 0),
    //   tap(() => status$.next('Zapisano')),
    //   switchMap(() => timer(2000)),
    //   filter(() => savesCounter === 0),
    //   tap(() => {
    //     const date = new Date().toLocaleString()
    //     status$.next(date)
    //   })
    // )
    const sub2 = autosave$.subscribe()
    this.genericSub.add(sub2)

    this.searchSaveStatus$ = status$.asObservable()

  }
  private zadanie5() {}
  private zadanie6() {}

  private zadanie7() {
    // licznik uruchomionych zapisów
    let savesInProgress = 0

    // wyzwalacz zapisu
    const inputToSave$ = fromEvent(this.saveInput!.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        map(e => (e.target as HTMLInputElement).value),
        distinctUntilChanged(),
      )

    // observable zapisu - mock np. httpClient.post
    const saveChanges = (value: string) => {
      return of(value).pipe(delay(1500))
    }

    // observable zapamiętujący że zaczął się zapis
    // uwaga na typ! savesInProgress$: Observable<Observable<string>>
    const savesInProgress$ = inputToSave$.pipe(
      map(() => of('Zapisuję')),
      tap(() => savesInProgress++)
    )

    // główny observable procesu zapisu, typ j/w
    const savesCompleted$ = inputToSave$.pipe(
      mergeMap(saveChanges),
      tap(() => savesInProgress--),
      // czy user wyzwolił w międzyczasie kolejny save?
      filter(() => savesInProgress === 0),
      map(() =>
        concat(
          // pokaż komunikat zapisu
          of('Zapisane!'),
          // poczekaj 2s
          of('').pipe(delay(2000), tap(() => console.log(new Date().toLocaleString()))),
          // zmień komunikat na datę ostatniego zapisu
          // of(`Last updated: ${new Date().toLocaleString()}`)
          defer(() => of(`Last updated: ${new Date().toLocaleString()}`))
        )
      )
    )

    this.saveStatus$ = merge(savesInProgress$, savesCompleted$)
      .pipe(
        switchAll()
      )

  }
  private zadanie8() {}
  coldToHot() {
    const emiter = (obs: Subscriber<string>) => {
      obs.next('kulka')
    }
    const coldHttpClient = new Observable(emiter)
    const hotHttpClient = coldHttpClient.pipe(share()) // Subject
    const hotHttpClient2 = coldHttpClient.pipe(shareReplay()) // BehaviorSubject

    const sub1 = coldHttpClient.subscribe(data => console.log(data))
    const sub2 = coldHttpClient.subscribe(data => console.log(data))
  }

  // onSearchChange(ev: Event) {
  //   console.log((ev.target as HTMLInputElement).value)
  //   // this.searchStream.next()
  // }

  private runTask(task: keyof typeof this.taskStates) {
    //@ts-expect-error
    this[`zadanie${task}`]()
  }

  protected toggleTask(task: number, value: boolean) {
    this.taskStates[task] = value
    sessionStorage.setItem('piaskownica.showTask', JSON.stringify(this.taskStates))
    if (value) {
      this.runTask(task)
    }
  }

  private loadTaskStatesFromSessionStorage() {
    const taskStates = sessionStorage.getItem('piaskownica.showTask')
    if (taskStates) {
      this.taskStates = JSON.parse(taskStates)
    }
  }

  ngOnDestroy() {
    this.genericSub.unsubscribe()
  }

  fromViewChild() {
    fromEvent(this.searchBox?.nativeElement as HTMLInputElement, 'input')
      .pipe(
        scan((searchHistory, userSearch) => {
          searchHistory += userSearch
          return searchHistory
        }, '')
      )
      .subscribe(console.log)
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value
    // this.searchStream.next(value)
  }
}