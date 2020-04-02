import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcodeHelpComponent } from './gcode-help.component';

describe('GcodeHelpComponent', () => {
  let component: GcodeHelpComponent;
  let fixture: ComponentFixture<GcodeHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcodeHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcodeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
