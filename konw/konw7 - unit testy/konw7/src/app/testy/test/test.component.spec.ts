import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestComponent } from './test.component'
import { first } from 'rxjs'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

fdescribe('TestComponent', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let componentHTML: HTMLElement

  beforeEach(async () => {
    // mockowanie modułu
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      // TestComponent używa w szablonie <app-test-serwis>. Możemy:
      // 1. Dostarczyć go w declarations (uwaga na jego zależności)
      // 2. dodać schema: [CUSTOM_ELEMENTS_SCHEMA] lub [NO_ERRORS_SCHEMA]
      // mówiąc "to nie moje, to z zewnętrza, ignoruj"
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

      // providers: []
      // imports: []
    })
      .compileComponents()

    // utworzenie ComponentFixture - opakowania na testowy komponent
    fixture = TestBed.createComponent(TestComponent)

    // instancja testowego komponentu
    component = fixture.componentInstance

    // wymuszenie cyklu detekcji zmian
    fixture.detectChanges()

    // nativeElement do testów DOM
    componentHTML = fixture.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have false showMessage', () => {
    expect(component.showMessage).toBeFalse()
  })

  it('[onToggleMessage] should toggle showMessage', () => {
    expect(component.showMessage).toBeFalse()
    component.onToggleMessage()
    expect(component.showMessage).toBeTrue()
    component.onToggleMessage()
    expect(component.showMessage).toBeFalse()
  })

  it('[onToggleMessage] should emit messageState', (done: DoneFn) => {
    expect(component.showMessage).toBeFalse()
    component.messageState.pipe(first()).subscribe(state => {
      expect(state).toBeTrue()
      done()
    })
    component.onToggleMessage()
  })

  it('shouldhave rendered title in h1', () => {
    const titleHTML = componentHTML.querySelector('h1')
    expect(titleHTML).toBeTruthy()
    expect(titleHTML?.textContent).toBe('Test component')
  })

  it('[button toglleMessage] should show #message', () => {
    const button = componentHTML.querySelector('button')
    expect(button).toBeTruthy()
    button!.click()
    expect(component.showMessage).toBeTrue()

    fixture.detectChanges()

    const messageHTML = componentHTML.querySelector('#message')
    expect(messageHTML).toBeTruthy()
    expect(messageHTML?.textContent).toBe('Wiadomość')
  })


})
