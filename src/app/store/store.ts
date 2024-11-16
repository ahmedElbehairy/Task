import { ActionReducerMap } from '@ngrx/store';
import UserReducer, { User } from './Reducers/User.reducer';

export interface StoreInterface {
  Users: User[];
}

export interface UserAction {
  type: string;
  payload?: any;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  Users: UserReducer,
};

