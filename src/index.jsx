import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import routes from './routes';
import reducers from './reducers';
import './styles/main.scss';

const store = createStore(reducers, {}, compose(
  applyMiddleware(
    thunk,
    routerMiddleware(browserHistory)
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
