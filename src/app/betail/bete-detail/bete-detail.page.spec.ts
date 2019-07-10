import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeteDetailPage } from './bete-detail.page';

describe('BeteDetailPage', () => {
  let component: BeteDetailPage;
  let fixture: ComponentFixture<BeteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeteDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
