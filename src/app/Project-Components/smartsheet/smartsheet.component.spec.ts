import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartsheetComponent } from './smartsheet.component';

describe('SmartsheetComponent', () => {
  let component: SmartsheetComponent;
  let fixture: ComponentFixture<SmartsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
