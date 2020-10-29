import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import MenuIcon from "@material-ui/icons/Menu";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  saveButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

const CalenAppBar = (props) => {
  const classes = useStyles();

  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(2);
  const [year, setYear] = useState(new Date().getFullYear());

  const isLeap = (year) => {
    if (year % 400 === 0)
        return 1
    if (year % 100 === 0)
        return 0
    if (year % 4 === 0)
        return 1
    else
        return 0
  }

  const toPast = () => {
    if(month < 0){
      if(year > new Date().getFullYear() - 5){
		  setYear(year - 1)
		  props.changeDate(day, month, year - 1)
	  }
    }
    else{
      if(day < 0){
        if(month > 1){
			setMonth(month - 1)
			props.changeDate(day, month - 1, year)
		}
      }
      else{
        if(day > 1){
			setDay(day - 1)
			props.changeDate(day - 1, month, year)
		}
      }
    }
  }

  const toFuture = () => {
    if(month < 0){
      if(year < new Date().getFullYear() + 5){
		  setYear(year + 1)
		  props.changeDate(day, month, year + 1)
	  }
    }
    else{
      if(day < 0){
        if(month < 12){
			setMonth(month + 1)
			props.changeDate(day, month + 1, year)
		}
      }
      else{
        var daysInMonth = (month === 2) ? (28 + isLeap(year)) : 31 - (month - 1) % 7 % 2;
        if(day < daysInMonth){
			setDay(day + 1)
			props.changeDate(day + 1, month, year)
		}
      }
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={1} justify="center" alignItems="center">
            <IconButton color="inherit" onClick={toPast}>
              <LeftIcon />
            </IconButton>

            <Typography variant="h6">
              {day > 0 && month > 0
                ? day.toString().padStart(2, "0") +
                  "/" +
                  month.toString().padStart(2, "0") +
                  "/" +
                  year
                : month > 0
                ? month.toString().padStart(2, "0") + "/" + year
                : year}
            </Typography>

            <IconButton color="inherit" onClick={toFuture}>
              <RightIcon />
            </IconButton>
          </Grid>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
          >
            <SaveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CalenAppBar;