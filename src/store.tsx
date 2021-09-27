import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootAppReducer from './reducer';

const enhancer = compose(applyMiddleware(thunk));


const store = createStore(rootAppReducer, undefined, enhancer);
export default store;