import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartsheetscompleteComponent } from './smartsheetscomplete.component';

describe('SmartsheetscompleteComponent', () => {
  let component: SmartsheetscompleteComponent;
  let fixture: ComponentFixture<SmartsheetscompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartsheetscompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartsheetscompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
