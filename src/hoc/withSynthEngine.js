import React, { Component } from 'react';
import SynthEngine, { isCompatibleBrowser } from '../lib/SynthEngine';

const { Consumer, Provider } = React.createContext();

const getSynthEngine = () => {
  if (!isCompatibleBrowser()) {
    return {
      isCompatibleBrowser: false,
      synthEngine: null,
      synthEngineError: new Error('Browser does not support the Web Audio API'),
    };
  }

  let synthEngine;

  try {
    synthEngine = new SynthEngine();
  } catch (err) {
    return {
      isCompatibleBrowser: false,
      synthEngine: null,
      synthEngineError: err,
    };
  }

  if (process.env.NODE_ENV === 'development') {
    window.__synthEngine = synthEngine;
  }

  return {
    isCompatibleBrowser: true,
    synthEngine,
    synthEngineError: null,
  };
};

export const withSynthEngineProvider = () => Comp =>
  class WithSynthEngineProvider extends Component {
    state = { ...getSynthEngine() };

    render () {
      return (
        <Provider value={this.state}>
          <Comp {...this.props} />
        </Provider>
      );
    }
  };

const withSynthEngine = () => Comp => {
  const WithSynthEngine = props => (
    <Consumer>
      {synthEngineProps => <Comp {...props} {...synthEngineProps} />}
    </Consumer>
  );

  return WithSynthEngine;
};

export default withSynthEngine;
