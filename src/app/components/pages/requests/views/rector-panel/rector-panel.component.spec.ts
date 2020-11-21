import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectorPanelComponent } from './rector-panel.component';

describe('RectorPanelComponent', () => {
  let component: RectorPanelComponent;
  let fixture: ComponentFixture<RectorPanelComponent>;

  beforeEach(async(() => {
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
