import { Component, OnInit } from '@angular/core';
import { PlanService } from './plan.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  plans: any;

  constructor(private planService: PlanService) {
  }

  ngOnInit() {
    this.planService.getPlans()
      .pipe(take(1))
      .subscribe(data => {
        this.plans = data ? data : [];
      });
  }

}
