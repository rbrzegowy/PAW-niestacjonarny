import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { combineLatestAll, concatAll, concatMap, delay, exhaustAll, from, interval, map, mapTo, mergeAll, Observable, of, pipe, scan, share, Subject, Subscription, switchAll, switchMap, take, timer, zipAll } from 'rxjs'

@Component({
  selector: 'app-higher-order-observables',
  templateUrl: './higher-order-observables.component.html',
  styleUrls: ['./higher-order-observables.component.scss']
})
export class HigherOrderObservablesComponent {
  protected ones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  protected tens = this.ones.map(val => val * 10)
  protected hundreds = this.ones.map(val => val * 100)

  protected ones$ = timer(0, 500).pipe(take(this.ones.length), map(i => this.ones[i]))
  protected tens$ = timer(0, 500).pipe(take(this.tens.length), map(i => this.tens[i]))
  protected hundreds$ = timer(0, 500).pipe(take(this.hundreds.length), map(i => this.hundreds[i]))

  protected innerObservables = [this.ones$, this.tens$, this.hundreds$]

  protected interval3000$ = interval(3000).pipe(take(this.innerObservables.length))

  protected mergeAll$ = this.interval3000$.pipe(map(i => this.innerObservables[i]), mergeAll())
  protected mergeAllHistory$ = this.mergeAll$.pipe(scan((history, val) => history += val + ', ', ''))

  protected switchAll$ = this.interval3000$.pipe(map(i => this.innerObservables[i]), switchAll())
  protected switchAllHistory$ = this.switchAll$.pipe(scan((history, val) => history += val + ', ', ''))

  protected concatAll$ = this.interval3000$.pipe(map(i => this.innerObservables[i]), concatAll())
  protected concatAllHistory$ = this.concatAll$.pipe(scan((history, val) => history += val + ', ', ''))

  protected exhaustAll$ = this.interval3000$.pipe(map(i => this.innerObservables[i]), exhaustAll())
  protected exhaustAllHistory$ = this.exhaustAll$.pipe(scan((history, val) => history += val + ', ', ''))

  protected zipAll$ = this.interval3000$.pipe(map(i => this.innerObservables[i]), zipAll())
  protected zipAllHistory$ = this.zipAll$.pipe(scan((history, val) => history += `[${val}], `, ''))

  protected combineLatestAll$ = this.interval3000$.pipe(map(i => this.innerObservables[i]), combineLatestAll())
  protected combineLatestAllHistory$ = this.combineLatestAll$.pipe(scan((history, val) => history += `[${val}], `, ''))


  constructor(private readonly httpClient: HttpClient) {}

  // przykład bardziej życiowy
  private higherOrderObservables() {
    const urls = [
      'http://mojeapi.dev/api1/',
      'http://mojeapi.dev/api2/',
      'http://mojeapi.dev/api3/',
      'http://mojeapi.dev/api4/',
    ]

    // tablica observabli i później asynchroniczny for
    const urlGetStreams = urls.map(url => this.getUrl(url))

    // lub strumień observabli i obsługujemy jak chcemy
    const urls$ = from(urls).pipe(
      map(url => this.getUrl(url)),
      // spłaszczamy albo za pomocą xxxMap (gdy chcemy po drodze jeszcze przetworzyć wewnętrzny strumień)
      switchMap(url => {
        return url
      })
      /// albo też za pomocą dedykowanych operatorów xxxAll (gdy się chcemy po prostu zapisać)
      // switchAll()
    )
  }

  getUrl(url: string) {
    return this.httpClient.get(url)
  }
}
