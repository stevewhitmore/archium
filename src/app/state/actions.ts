import { Action } from '@ngrx/store';

export const VIEW_MODE = 'View Mode';
export const EDIT_MODE = 'Edit Mode';
export const ADD_MODE = 'Add Mode';
export const DELETE_MODE = 'Delete Mode';

export class ViewMode implements Action {
  readonly type = VIEW_MODE;
}
export class EditMode implements Action {
  readonly type = EDIT_MODE;
}
export class AddMode implements Action {
  readonly type = ADD_MODE;
}
export class DeleteMode implements Action {
  readonly type = DELETE_MODE;
}

export type All
  = ViewMode
  | EditMode
  | AddMode
  | DeleteMode
