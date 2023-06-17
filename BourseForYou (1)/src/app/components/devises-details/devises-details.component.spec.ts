import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisesDetailsComponent } from './devises-details.component';

describe('DevisesDetailsComponent', () => {
  let component: DevisesDetailsComponent;
  let fixture: ComponentFixture<DevisesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
