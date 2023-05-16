import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePortefeuilleComponent } from './liste-portefeuille.component';

describe('ListePortefeuilleComponent', () => {
  let component: ListePortefeuilleComponent;
  let fixture: ComponentFixture<ListePortefeuilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePortefeuilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
