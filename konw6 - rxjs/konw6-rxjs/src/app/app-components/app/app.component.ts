import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, Event } from '@angular/router';
import { debounceTime, debounce, distinctUntilChanged, filter, interval, map, Observable, of, tap, timer, EMPTY, delay, switchMap, concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular zaawansowany - materiały szkoleniowe'

  protected isLoading$!: Observable<boolean>;

  isLoading = false
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
    })

    this.handleLoader()
  }
  private handleLoader() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.isLoading = false
      }
    })






















    this.isLoading$ = this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationStart),
      map(ev => ev instanceof NavigationStart),
      // debounceTime(1000),
      // delay(1000),
      debounce(isLoading => isLoading ? timer(1000) : of(false)),
    )
  }
}
