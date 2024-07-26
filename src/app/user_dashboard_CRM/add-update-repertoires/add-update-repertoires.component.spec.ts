import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRepertoiresComponent } from './add-update-repertoires.component';

describe('AddUpdateRepertoiresComponent', () => {
  let component: AddUpdateRepertoiresComponent;
  let fixture: ComponentFixture<AddUpdateRepertoiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateRepertoiresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateRepertoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
