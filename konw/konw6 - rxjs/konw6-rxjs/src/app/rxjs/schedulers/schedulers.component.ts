import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, observeOn, take, Observable, BehaviorSubject, from, animationFrameScheduler, queueScheduler, finalize, asyncScheduler, of, timeInterval, tap, map, timer, takeWhile, Subject, takeUntil, startWith } from 'rxjs';

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.scss']
})
export class SchedulersComponent implements OnInit, AfterViewInit {
  protected boxWidth$!: Observable<number>;
  protected boxWidth2$!: Observable<number>;
  protected timer$!: Observable<string>;
  constructor() {}

  ngOnInit(): void {
    this.variousExecutionContexts()
    this.asyncScheduler()
  }
  ngAfterViewInit(): void {
    this.animationFrameSchedulerExample()
  }

  variousExecutionContexts() {
    console.log('[TASK ORDER] START') // 1
    setTimeout(() => console.log('[TASK ORDER] setTimeout'), 0) // 2
    requestAnimationFrame(() => console.log('[TASK ORDER] animationFrame')) // 3
    Promise.resolve().then(() => console.log('[TASK ORDER] Promise.resolve')) // 4
    of('[TASK ORDER] Rxjs Of').subscribe(console.log) // 5
    console.log('[TASK ORDER] END') // 6
  }




  animationFrameSchedulerExample() {
    let animationFinished = false;
    const range$ = interval(0).pipe(take(600));
    const range2$ = interval(0, animationFrameScheduler).pipe(take(600), finalize(() => animationFinished = true));

    this.boxWidth$ = range$
    this.boxWidth2$ = range2$

    const timerIntervalInMiliseconds = 10
    this.timer$ = interval(timerIntervalInMiliseconds).pipe(
      takeWhile(() => !animationFinished),
      map((val: number) => {
        const milisecondsFromStart = val * timerIntervalInMiliseconds
        const timer = (milisecondsFromStart / 1000).toFixed(2)
        return timer
      }))
  }
  onAnimationFrame() {
    console.log('Animation frame')
    requestAnimationFrame(this.onAnimationFrame.bind(this))
  }
  asyncScheduler() {
    // operator observeOn - scheduler dla emisji (proxy dla observera)
    // operator subscribeOn - scheduler dla subskrypcji (kiedy ma nastąpić subskrypcja)

    const observable = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    })

    const bs = new BehaviorSubject(-1)
    from([10, 20, 30]).subscribe(val => bs.next(val))

    console.log('[asyncScheduler] before subscribe');
    bs.pipe(
      observeOn(asyncScheduler)
    )
      .subscribe({
        next(x) {
          console.log('[asyncScheduler] sub value: ' + x);
        },
        error(err) {
          console.error('[asyncScheduler] sub error: ' + err);
        },
        complete() {
          console.log('[asyncScheduler] sub complete');
        },
      });
    bs.next(100)
    console.log('[asyncScheduler] after subscribe');
  }

}
