import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationConfirmComponent } from './location-confirm.component';

describe('LocationConfirmComponent', () => {
  let component: LocationConfirmComponent;
  let fixture: ComponentFixture<LocationConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
