import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditticketlistComponent } from './editticketlist.component';

describe('EditticketlistComponent', () => {
  let component: EditticketlistComponent;
  let fixture: ComponentFixture<EditticketlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditticketlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditticketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
