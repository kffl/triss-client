import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqeustDirectorComponent } from './reqeust-director.component';

describe('ReqeustDirectorComponent', () => {
  let component: ReqeustDirectorComponent;
  let fixture: ComponentFixture<ReqeustDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqeustDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqeustDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
