import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationV2Component } from './location-v2.component';

describe('LocationV2Component', () => {
  let component: LocationV2Component;
  let fixture: ComponentFixture<LocationV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationV2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
