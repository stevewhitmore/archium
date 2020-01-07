import { Observable, of, BehaviorSubject } from 'rxjs';

export class StoreStub<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(null);

  select(selector): Observable<any> {
    const defaultState = {
      viewOnly: true,
      editView: false,
      addView: false,
      deleteView: false
    }

    return of(defaultState);
  }

  dispatch(action) {}

  pipe() {}
}