import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsChartjsLineComponent } from './ops-chartjs-line.component';

describe('OpsChartjsLineComponent', () => {
  let component: OpsChartjsLineComponent;
  let fixture: ComponentFixture<OpsChartjsLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsChartjsLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsChartjsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
