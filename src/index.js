import React from 'react';
import {render} from 'react-dom';
import App from './App/App';
import './styles/normalize/normalize.scss';
import './styles/grid/main.scss';
import './styles/global/global.scss';

render(
	<App />,
	document.querySelector('#root')
);
