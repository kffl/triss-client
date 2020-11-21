import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildaPanelComponent } from './wilda-panel.component';

describe('WildaPanelComponent', () => {
  let component: WildaPanelComponent;
  let fixture: ComponentFixture<WildaPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildaPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
