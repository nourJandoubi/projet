import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPortefeuilleComponent } from './modifier-portefeuille.component';

describe('ModifierPortefeuilleComponent', () => {
  let component: ModifierPortefeuilleComponent;
  let fixture: ComponentFixture<ModifierPortefeuilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierPortefeuilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierPortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
