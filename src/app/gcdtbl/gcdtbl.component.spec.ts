import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcdtblComponent } from './gcdtbl.component';

describe('GcdtblComponent', () => {
  let component: GcdtblComponent;
  let fixture: ComponentFixture<GcdtblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcdtblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcdtblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
