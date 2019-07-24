import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

const mockData = require('../_testing/test-data/mock-plans.json');

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) {
  }

  getPlans(): Observable<any> {
    return of(mockData);
  }

}
