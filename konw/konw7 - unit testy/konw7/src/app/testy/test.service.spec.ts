import { TestBed } from '@angular/core/testing'
import { TestService } from './test.service'
import { skip, take } from 'rxjs'
import { NumbersService } from '../services/numbers/numbers.service'

describe('TestService', () => {
  let service: TestService

  beforeEach(() => {
    // środowisko
    TestBed.configureTestingModule({})

    // jeśli mamy zależności (poniżej w testach jeszcze inny sposób)
    // TestBed.configureTestingModule(
    //   {
    //     providers: [{ provide: NumbersService, useValue: NumbersFakeService }]
    //   });
    // testowany serwis

    service = TestBed.inject(TestService)

    // ale moglibyśmy też po prostu zrobić (kwestia dostarczenia zależności)
    // const ns = new NumbersService()
    // service = new TestService(ns)

    // inne podejście do testów - service tworzymy osobno w każdym it()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('[add] should add 2+4', () => {
    const sum = service.add(2, 4)
    expect(sum).toEqual(6)
    // const sum2 = service.add(5, 9)
    // expect(sum2).toEqual(14)
  })

  // metody nie zwracające parametrów
  it('[nextToJokes, getLastJoke] should get last joke', () => {
    const joke = '....i wtedy wchodzę ja...'
    service.nextToJokes(joke)
    const lastJoke = service.getLastJoke()
    expect(lastJoke).toEqual(joke)
  })

  // asynchroniczny test (observable)
  // można też zrobić async/await na callbacku it
  it('[getNumbers] should generate numbers interval', (done: DoneFn) => {
    const obs$ = service.getNumbers()
    // test lekko naiwny. Pełne podejście do testów observables - MarbleTesting
    obs$.pipe(skip(2), take(1)).subscribe(data => {
      expect(data).toBe(2)
      // zakończenie testu
      done()
    })
  })

  // z mockowaniem wstrzykniętego serwisu
  it('[getDateFromTimestamp] should get date from timestamp', () => {
    const timestamp = 12345
    const dateFromTimestamp = new Date(timestamp)
    const isoDate = dateFromTimestamp.toISOString()

    // mockowanie wstrzykiwanych zależności - różne sposoby
    // 1. bez mocka:) uwaga - zależności rodzą zależności:)
    const localService = new TestService(new NumbersService())
    // 2. lokalny fake
    // const fakeNumberService = { getDateFromTimestamp: (t: number) => dateFromTimestamp }
    // const localService = new TestService(fakeNumberService as NumbersService)
    // 3. zewnętrzny fake
    // const localService = new TestService(new NumbersTestService())
    // 4. Z użyciem Jasmine.createSpyObj()
    // const numbersSpy = jasmine.createSpyObj('NumbersService', ['getDateFromTimestamp'])
    // numbersSpy.getDateFromTimestamp.and.returnValue(dateFromTimestamp)
    // const localService = new TestService(numbersSpy)

    const testDate = localService.getDateFromTimestamp(timestamp)
    expect(testDate.toISOString()).toEqual(isoDate)
  })
})
