import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import SearchBox from './SearchBox';

import {
	RefinementListFilter,
	SearchkitComponent, SearchkitManager
} from "searchkit";

const sk = new SearchkitManager("http://localhost:5000/elasticsearch")

class MyComponent extends SearchkitComponent {
	render() {
		return (
			<RefinementListFilter field="test"  title={}/>
		);
	}
}

const component = (
	<Provider store={store}>
		<MyComponent />
		<SearchBox />
	</Provider>
);

ReactDOM.render(component, document.getElementById('app'));
