import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlCondComponent } from './dl-cond.component';

describe('DlCondComponent', () => {
  let component: DlCondComponent;
  let fixture: ComponentFixture<DlCondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlCondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
