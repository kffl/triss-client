import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorPanelComponent } from './director-panel.component';

describe('DirectorPanelComponent', () => {
  let component: DirectorPanelComponent;
  let fixture: ComponentFixture<DirectorPanelComponent>;

  beforeEach(async(() => {
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
