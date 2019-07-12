import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBetailPage } from './edit-betail.page';

describe('EditBetailPage', () => {
  let component: EditBetailPage;
  let fixture: ComponentFixture<EditBetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
