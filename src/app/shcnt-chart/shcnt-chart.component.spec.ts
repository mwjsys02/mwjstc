import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShcntChartComponent } from './shcnt-chart.component';

describe('ShcntChartComponent', () => {
  let component: ShcntChartComponent;
  let fixture: ComponentFixture<ShcntChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShcntChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShcntChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
