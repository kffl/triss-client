import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqeustWildaComponent } from './reqeust-wilda.component';

describe('ReqeustWildaComponent', () => {
  let component: ReqeustWildaComponent;
  let fixture: ComponentFixture<ReqeustWildaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqeustWildaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqeustWildaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
