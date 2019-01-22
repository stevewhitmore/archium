import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ActivatedRouteStub {
    private _testParams = {};
    private subject = new BehaviorSubject(this.testParams)

    get testParams() {
        return this._testParams;
    }

    set testParams(queryParams: {}) {
        this._testParams = queryParams;
        this.subject.next(queryParams);
    }
}