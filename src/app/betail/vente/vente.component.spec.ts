import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteComponent } from './vente.component';

describe('VenteComponent', () => {
  let component: VenteComponent;
  let fixture: ComponentFixture<VenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
