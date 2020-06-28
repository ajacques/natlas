import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import SearchBox from './SearchBox';

import {
	RefinementListFilter,
	SearchkitComponent,
	SearchkitProvider,
	SearchkitComponentProps,
	SearchkitManager
} from "searchkit";

interface Props extends SearchkitComponentProps {

}

const sk = new SearchkitManager("http://localhost:5000/elasticsearch");

class MyComponent extends SearchkitComponent<Props, never> {
	render() {
		return (
			<SearchkitProvider searchkit={sk}>
				<RefinementListFilter id="test" field="test" title="Service" />
			</SearchkitProvider>
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
