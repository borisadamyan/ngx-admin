import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsMtrComponent } from './ops-mtr.component';

describe('OpsMtrComponent', () => {
  let component: OpsMtrComponent;
  let fixture: ComponentFixture<OpsMtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsMtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsMtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
