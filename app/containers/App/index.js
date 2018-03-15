import React from 'react';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import './style.css';
import logo from './logo.svg';

type Props = { route: Object };

const App = ({ route }: Props) => (
  <div
    className="App"
  >
    <Helmet
      defaultTitle="React.js Boilerplate"
      titleTemplate="%s - React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>

    <header
      className="App-header"
    >
      <img
        src={logo}
        alt="logo"
        className="App-logo"
      />

      <h1
        className="App-title"
      >
        Welcome to React
      </h1>
    </header>

    <p
      className="App-intro"
    >
      To get started, edit <code>app/containers/App/index.js</code> and save to reload.
    </p>

    {renderRoutes(route.routes)}
  </div>
);

export default App;
