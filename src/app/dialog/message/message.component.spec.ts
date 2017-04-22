import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidPasswordComponent } from './message.component';

describe('InvalidPasswordComponent', () => {
  let component: InvalidPasswordComponent;
  let fixture: ComponentFixture<InvalidPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
