import { createStore, combineReducers } from 'redux';

function searchReducer(state: object = null) {
	return state;
}

export type RootState = {
	search: any
};

const rootReducer = combineReducers({
	search: searchReducer
});
// @ts-ignore
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

export default store;
