import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { PlanService } from './plan.service';
import { PlanServiceStub } from '../_shared/testing/plan-service.stub';

const planServiceStub = new PlanServiceStub;

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanComponent ],
      providers: [
        { provide: PlanService, useValue: planServiceStub }
      ]
    })
    
    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
