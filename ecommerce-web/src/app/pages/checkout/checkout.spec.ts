import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponet } from './checkout';

describe('CheckoutComponet', () => {
  let component: CheckoutComponet;
  let fixture: ComponentFixture<CheckoutComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
