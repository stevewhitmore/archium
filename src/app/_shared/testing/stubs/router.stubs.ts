import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { url } from 'inspector';

@Injectable()
export class ActivatedRouteStub {
    private subject = new BehaviorSubject(this.testParams);
    queryParams = this.subject.asObservable();

    private _testParams: {};
    private _params: {};

    get testParams() {
        return this._testParams;
    }

    get params() {
        return this._params;
    }

    set testParams(queryParams: {}) {
        this._testParams = queryParams;
        this.subject.next(queryParams);
    }

    set params(queryParams: {}) {
        this._params = queryParams;
        this.subject.next(queryParams);
    }

    get snapShot() {
        if (this.testParams) {
            return {queryParams: this.testParams, params: this.testParams}
        } else if (this.params) {
            return {queryParams: this.params, params: this.params}
        } else {
            return null;
        }
    }
}

@Injectable()
export class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }

    navigate(commands: any[], extras?: any) {
        return '';
    }
}