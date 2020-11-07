import React, { useEffect } from 'react';
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

const Day = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const toHome = () => {
    history.push('/');
  }

  useEffect(() => {

    console.log(props.loggedin);

    if(!props.loggedin){
      toHome();
    }
  }, [])

	return <Typography>Day {props.match.params.day + '/' + props.match.params.month + '/' + props.match.params.year}</Typography>;
}

export default Day;