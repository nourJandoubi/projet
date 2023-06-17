import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPortefeuilleComponent } from './ajouter-portefeuille.component';

describe('AjouterPortefeuilleComponent', () => {
  let component: AjouterPortefeuilleComponent;
  let fixture: ComponentFixture<AjouterPortefeuilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPortefeuilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterPortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
