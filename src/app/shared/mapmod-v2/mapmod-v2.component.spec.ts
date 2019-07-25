import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmodV2Component } from './mapmod-v2.component';

describe('MapmodV2Component', () => {
  let component: MapmodV2Component;
  let fixture: ComponentFixture<MapmodV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmodV2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapmodV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
