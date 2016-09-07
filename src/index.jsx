import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import api from './middlewares/api';
import routes from './routes';
import reducers from './reducers';

import './styles/main.scss';
import { muiTheme } from './styles';

injectTapEventPlugin();

const store = createStore(reducers, {}, compose(
  applyMiddleware(
    api(),
    routerMiddleware(browserHistory)
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(browserHistory, store);

render(
  <MuiThemeProvider
    muiTheme={muiTheme}
  >
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
