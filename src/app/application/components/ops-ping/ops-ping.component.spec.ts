import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsPingComponent } from './ops-ping.component';

describe('OpsPingComponent', () => {
  let component: OpsPingComponent;
  let fixture: ComponentFixture<OpsPingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsPingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsPingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
