import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTemplateComponent } from './panel-template.component';

describe('PanelTemplateComponent', () => {
  let component: PanelTemplateComponent;
  let fixture: ComponentFixture<PanelTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
