import React from 'react';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import config from 'config';

import './style.css';
import logo from './logo.svg';

type Props = { route: Object };

const App = ({ route }: Props) => (
  <div className="App">
    <Helmet {...config.app} />

    <header className="App-header">
      <img src={logo} alt="logo" className="App-logo" />

      <h1 className="App-title">{config.app.title}</h1>
    </header>

    <p className="App-intro">
      To get started, edit <code>app/containers/App/index.js</code> and save to
      reload.
    </p>

    {renderRoutes(route.routes)}
  </div>
);

export default App;
