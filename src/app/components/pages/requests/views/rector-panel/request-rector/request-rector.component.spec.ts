import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRectorComponent } from './request-rector.component';

describe('ReqeustRectorComponent', () => {
  let component: RequestRectorComponent;
  let fixture: ComponentFixture<RequestRectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
