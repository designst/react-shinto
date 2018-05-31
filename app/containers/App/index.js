import React from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import config from 'config';

import './style.css';
import logo from './logo.svg';

type Props = { route: Object };

class App extends React.Component {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');

    /* istanbul ignore next */
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  props: Props;

  render() {
    const { route } = this.props;

    return (
      <div className="App">
        <Helmet {...config.app} />

        <header className="App-header">
          <img src={logo} alt="logo" className="App-logo" />

          <h1 className="App-title">{config.app.title}</h1>
        </header>

        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default hot(module)(App);
