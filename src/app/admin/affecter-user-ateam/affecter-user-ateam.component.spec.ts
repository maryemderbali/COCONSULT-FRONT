import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterUserAteamComponent } from './affecter-user-ateam.component';

describe('AffecterUserAteamComponent', () => {
  let component: AffecterUserAteamComponent;
  let fixture: ComponentFixture<AffecterUserAteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterUserAteamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecterUserAteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
