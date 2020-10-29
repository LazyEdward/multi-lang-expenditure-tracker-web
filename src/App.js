import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import CalenAppBar from './utils/AppBar';

import {Route, Switch, BrowserRouter} from 'react-router-dom';

function App() {

  const [loggedin, setLoggedIn] = useState(false);

  const [day, setDay] = useState(-1);
  const [month, setMonth] = useState(-1);
  const [year, setYear] = useState(-1);

  // return (
  //   <BrowserRouter>
  //     <Switch>
        
  //     </Switch>
  //   </BrowserRouter>
  // );
  return(
    <CalenAppBar changeDate={(day, month, year) => {
      setDay(day)
      setMonth(month)
      setYear(year)
      console.log(day+'/'+month+'/'+year)
    }}/>
  )
}

export default App;
