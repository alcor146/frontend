import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConfirmComponent } from './card-confirm.component';

describe('CardConfirmComponent', () => {
  let component: CardConfirmComponent;
  let fixture: ComponentFixture<CardConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
