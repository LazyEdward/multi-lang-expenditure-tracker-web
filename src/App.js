import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AuthProvider from './context/AuthContext.js'
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

  const [loggedin, setLoggedIn] = useState(false);

  const [user_id, setUserId] = useState('');
  const [loginToken, setLoginToken] = useState('');

  const [makeChange, setMakeChange] = useState(false);
  const [data, setData] = useState(null);

  // const [day, setDay] = useState(-1);
  // const [month, setMonth] = useState(-1);
  // const [year, setYear] = useState(-1);

  const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF5588', '#FF396C', '#FF1C4F', '#FF0033']]

  const history = createBrowserHistory();

  // var showLogin;
  var showCalenAppBar;

  var menubgImgStyle = 'radial-gradient(circle at 50% 50%, ' + colorSet[0][0] + ' 5%, ' + colorSet[0][1] + ' 15%, ' + colorSet[0][2] + ' 25%, ' + colorSet[0][3] + ' 50%)';

  // if(loggedin){
  //   // showLogin = null;
  //   showCalenAppBar = <CalenAppBar date={{day: day, month: month, year: year}} dataChange={makeChange} changeDate={(day, month, year) => {
  //     setDay(day)
  //     setMonth(month)
  //     setYear(year)
  //     console.log(day+'/'+month+'/'+year)
  //   }}
  //   logout={() => {
  //     setUserId('');
  //     setLoginToken('');
  //     setData(null)
  //     setLoggedIn(false);
  //   }}
  //   />
  // }
  // else{
  //   showCalenAppBar = null;
  //   // showLogin = <Grid container spacing={0} justify="center" alignItems="center">
  //   //               <Grid item xs={12} style={{maxWidth: '300px', marginTop: '50vh', backgroundImage: `${menubgImgStyle}`}}>
  //   //                 <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
  //   //                   setLoggedIn(true)
  //   //                   }}>Login</Button>
  //   //               </Grid>                  
  //   //             </Grid>
  // }

  return(
      <AuthProvider>
        <DateProvider>
          <DataStoreProvider>
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
          </DataStoreProvider>
        </DateProvider>
      </AuthProvider>
  )
}

export default App;
