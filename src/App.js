import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';

import CalenAppBar from './utils/AppBar';

import Login from './routes/login';
import Day from './routes/day';
import Month from './routes/month';
import Year from './routes/year';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';

function App() {

  const [loggedin, setLoggedIn] = useState(false);

  const [day, setDay] = useState(-1);
  const [month, setMonth] = useState(-1);
  const [year, setYear] = useState(-1);

  const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF5588', '#FF396C', '#FF1C4F', '#FF0033']]

  const history = createBrowserHistory();

  // var showLogin;
  var showCalenAppBar;

  var menubgImgStyle = 'radial-gradient(circle at 50% 50%, ' + colorSet[0][0] + ' 5%, ' + colorSet[0][1] + ' 15%, ' + colorSet[0][2] + ' 25%, ' + colorSet[0][3] + ' 50%)';

  if(loggedin){
    // showLogin = null;
    showCalenAppBar = <CalenAppBar date={{day: day, month: month, year: year}} changeDate={(day, month, year) => {
      setDay(day)
      setMonth(month)
      setYear(year)
      console.log(day+'/'+month+'/'+year)
    }}
    logout={() => setLoggedIn(false)}
    />
  }
  else{
    showCalenAppBar = null;
    // showLogin = <Grid container spacing={0} justify="center" alignItems="center">
    //               <Grid item xs={12} style={{maxWidth: '300px', marginTop: '50vh', backgroundImage: `${menubgImgStyle}`}}>
    //                 <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
    //                   setLoggedIn(true)
    //                   }}>Login</Button>
    //               </Grid>                  
    //             </Grid>
  }

  return(
    <BrowserRouter history={history}>
      {/* {showLogin} */}
      {showCalenAppBar}
      <Switch>
        <Route exact path='/' render={(props) =>
            <Login {...props}
                  loggedin={loggedin}
                  login={() => setLoggedIn(true)}
                  changeDate={(day, month, year) => {
                    setDay(day)
                    setMonth(month)
                    setYear(year)
                    console.log(day+'/'+month+'/'+year)
                  }}
            />} />
        <Route path='/year/:year' render={(props) => <Year {...props} loggedin={loggedin}/>} />
        <Route path='/month/:month/:year' render={(props) => <Month {...props}  loggedin={loggedin}/>} />
        <Route path='/day/:day/:month/:year' render={(props) => <Day {...props} loggedin={loggedin} />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
