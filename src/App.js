import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AuthProvider from './context/AuthContext.js'
import StyleProvider from './context/StyleContext.js'
import DateProvider from './context/DateContext.js'
import DataStoreProvider from './context/DataStoreContext.js'

import { useTranslation } from 'react-i18next';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import CalenAppBar from './utils/AppBar.js';

import Login from './routes/login.js';
import Day from './routes/day.js';
import Month from './routes/month.js';
import Year from './routes/year.js';
import Setting from './routes/setting.js';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';

function App() {

  const history = createBrowserHistory();

	const { t, i18n } = useTranslation();

  const preventDefault = (e) => {
    history.go(1)
  }

  useEffect(() => {
    window.addEventListener('popstate', (e) => preventDefault(e));
  },[])

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
                  <Route path='/setting' render={(props) => <Setting {...props} />} />
                </Switch>
                <Grid container spacing={0} direction="column" justify="center" alignItems="center" style={{marginTop: '1vh'}}>
                  <Grid container item justify="center" alignItems="center" style={{maxWidth: '300px', paddingTop: '4px', paddingBottom: '4px', margin: '5px 0px'}}>
                    <ButtonGroup variant="text" color="primary">
                      {Object.keys(i18n.store.data).map((val) => (
                        <Button
                          key={val}
                          style={{fontSize: '12px'}}
                          onClick={() => i18n.changeLanguage(val)}
                        >
                          {t('lang.' + val)}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </BrowserRouter>
            </StyleProvider>
          </DataStoreProvider>
        </DateProvider>
      </AuthProvider>
  )
}

export default App;
