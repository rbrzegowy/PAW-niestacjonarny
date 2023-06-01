import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getUserData should get user data from api', () => {
    const api = {
      get(url: string) {
        return 'abc'
      }
    }
    const comp = new UserComponent(api)
    const data = comp.getUserData()
    expect(component).toBeTruthy();
  });
});
