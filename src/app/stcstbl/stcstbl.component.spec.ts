import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StcstblComponent } from './stcstbl.component';

describe('StcstblComponent', () => {
  let component: StcstblComponent;
  let fixture: ComponentFixture<StcstblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StcstblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StcstblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
