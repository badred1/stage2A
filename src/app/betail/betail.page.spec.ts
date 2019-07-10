import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetailPage } from './betail.page';

describe('BetailPage', () => {
  let component: BetailPage;
  let fixture: ComponentFixture<BetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
