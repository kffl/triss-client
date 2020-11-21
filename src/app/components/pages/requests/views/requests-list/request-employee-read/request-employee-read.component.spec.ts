import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEmployeeReadComponent } from './request-employee-read.component';

describe('RequestEmployeeReadComponent', () => {
  let component: RequestEmployeeReadComponent;
  let fixture: ComponentFixture<RequestEmployeeReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestEmployeeReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestEmployeeReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
