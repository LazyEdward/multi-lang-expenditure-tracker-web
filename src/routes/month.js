import React, { useEffect, useContext } from 'react';
import {AuthContext} from '../context/AuthContext'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

const Month = (props) => {
  const classes = useStyles();

  const {loggedin} = useContext(AuthContext);

  const history = useHistory();
  
  const toHome = () => {
    history.push('/');
  }

  useEffect(() => {

    console.log(loggedin);

    if(!loggedin){
      toHome();
    }
  }, [])

  return <Typography>Month {props.match.params.month + '/' + props.match.params.year}</Typography>;
}

export default Month;