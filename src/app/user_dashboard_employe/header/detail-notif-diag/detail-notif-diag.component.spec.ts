import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNotifDiagComponent } from './detail-notif-diag.component';

describe('DetailNotifDiagComponent', () => {
  let component: DetailNotifDiagComponent;
  let fixture: ComponentFixture<DetailNotifDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailNotifDiagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailNotifDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
