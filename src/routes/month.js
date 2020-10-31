import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

export default function Month(props) {
  const classes = useStyles();

  return <Typography>Month {props.match.params.month + '/' + props.match.params.year}</Typography>;
}
