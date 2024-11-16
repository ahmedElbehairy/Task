import { UserAction } from '../store';
import { SUCCESS, FATLED, LOAD } from '../Actions/User.action';
import {
  ActionReducer,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';


export interface User {
  Name: string;
  Id: number;
  Phone: string;
  Email: string;
}

const initialState: User[] = [];

const UserReducer: ActionReducer<User[], UserAction> = (
  state: User[] = initialState,
  action: UserAction
): User [] => {
  switch (action.type) {
    case LOAD:
      return action.payload
    case SUCCESS:
      return action.payload;
    case FATLED:
      return action.payload;
    default:
      return state;
  }
};

let UsersFs = createFeatureSelector<User>('Users');
export let UsersSelector = createSelector(UsersFs, (state) => state);

export default UserReducer;
