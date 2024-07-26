import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEntrpriseComponent } from './signupentreprise.component';

describe('signupentreprise', () => {
  let component: SignupEntrpriseComponent;
  let fixture: ComponentFixture<SignupEntrpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupEntrpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupEntrpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
