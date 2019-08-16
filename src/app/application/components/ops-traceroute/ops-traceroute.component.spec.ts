import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsTracerouteComponent } from './ops-traceroute.component';

describe('OpsTracerouteComponent', () => {
  let component: OpsTracerouteComponent;
  let fixture: ComponentFixture<OpsTracerouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsTracerouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsTracerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
