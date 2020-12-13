import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DirectorPanelComponent } from './director-panel.component';

describe('DirectorPanelComponent', () => {
  let component: DirectorPanelComponent;
  let fixture: ComponentFixture<DirectorPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
