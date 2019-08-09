import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsTimeChartComponent } from './ops-time-chart.component';

describe('OpsTimeChartComponent', () => {
  let component: OpsTimeChartComponent;
  let fixture: ComponentFixture<OpsTimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsTimeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
