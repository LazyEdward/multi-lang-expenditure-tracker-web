import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AuthProvider from './context/AuthContext.js'
import StyleProvider from './context/StyleContext.js'
import DateProvider from './context/DateContext.js'
import DataStoreProvider from './context/DataStoreContext.js'

import CalenAppBar from './utils/AppBar.js';

import Login from './routes/login.js';
import Day from './routes/day.js';
import Month from './routes/month.js';
import Year from './routes/year.js';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';

function App() {

  const history = createBrowserHistory();

  return(
      <AuthProvider>
        <DateProvider>
          <DataStoreProvider>
            <StyleProvider>
              <BrowserRouter history={history}>
                {/* {showLogin} */}
                {/* {showCalenAppBar} */}
                <CalenAppBar/>
                <Switch>
                  <Route exact path='/' render={(props) => <Login {...props} />} />
                  <Route path='/year/:year' render={(props) => <Year {...props} />} />
                  <Route path='/month/:month/:year' render={(props) => <Month {...props} />}/>
                  <Route path='/day/:day/:month/:year' render={(props) => <Day {...props} />}/>
                </Switch>
              </BrowserRouter>
            </StyleProvider>
          </DataStoreProvider>
        </DateProvider>
      </AuthProvider>
  )
}

export default App;
