import './less/reset.less';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import compose from './lib/compose';
import routes from './config/routes';
import { withParameterSpaceProvider } from './hoc/withParameterSpace';
import { withSynthesisEngineProvider } from './hoc/withSynthesisEngine';
import { withViewportProvider } from './hoc/withViewport';

const App = ({ context, routerComponent: Router, location }) => (
  <Router {...(location ? { context, location } : {})}>
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  </Router>
);

const enhance = compose(
  withParameterSpaceProvider(),
  withSynthesisEngineProvider(),
  typeof window !== 'undefined' ? withViewportProvider() : Comp => Comp
);

export default enhance(App);
