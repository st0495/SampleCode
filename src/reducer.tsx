import { AnyAction, combineReducers, EmptyObject } from 'redux';
import DashBoardScreenReducer from './containers/Dashboard/reducer';

const rootAppReducer = combineReducers({
  DashBoardScreenReducer,
});

const rootReducer = (state: any, action: any) => {
  return rootAppReducer(state, action);
};

export default rootReducer;
