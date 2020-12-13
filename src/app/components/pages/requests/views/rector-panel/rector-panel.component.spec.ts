import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RectorPanelComponent } from './rector-panel.component';

describe('RectorPanelComponent', () => {
  let component: RectorPanelComponent;
  let fixture: ComponentFixture<RectorPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RectorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
