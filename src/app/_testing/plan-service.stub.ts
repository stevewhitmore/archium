import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

const mockData = require('../_testing/test-data/mock-plans.json');

@Injectable()
export class PlanServiceStub {

  getPlans(): Observable<any> {
    return of(mockData);
  }

}
