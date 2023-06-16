import { Injectable } from '@angular/core'
import { BehaviorSubject, interval } from 'rxjs'
import { NumbersService } from '../services/numbers/numbers.service'

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private jokes = new BehaviorSubject('')

  constructor(private readonly numbers: NumbersService) {}

  add(a: number, b: number) {
    return a + b
  }
  nextToJokes(joke: string) {
    this.jokes.next(joke)
  }
  getLastJoke(): string {
    return this.jokes.value
  }

  getNumbers() {
    return interval(1000)
  }

  getDateFromTimestamp(timestamp: number) {
    return this.numbers.getDateFromTimestamp(timestamp)
  }
}
