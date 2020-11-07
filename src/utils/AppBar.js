import React, { useEffect, useState } from "react";
import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import MenuIcon from "@material-ui/icons/Menu";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";

import Backdrop from '@material-ui/core/Backdrop';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useHistory} from 'react-router-dom';

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
  },
  boxContainer: {
    color: 'white',textTransform: 'none',
  },
  backdrop: {
    zIndex: theme.zIndex.appBar + 1,
    color: '#fff',
  },
  frontdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const CalenAppBar = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const [openMenu, setOpenMenu] = useState(false);

  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const [currentMenuElement, setCurrentMenuElement] = useState(0);

  const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF5588', '#FF396C', '#FF1C4F', '#FF0033']]
  const menuElements = ['Day', 'Month', 'Year', 'Setting', 'Logout', '']

  var menubgImgStyle;

  if(smUp){
    menubgImgStyle = 'radial-gradient(circle at ' + (currentMenuElement + 0.5) / menuElements.length * 100 + '% 50%, ' + colorSet[0][0] + ', ' + colorSet[0][1] + ', ' + colorSet[0][2] + ', ' + colorSet[0][3] + ' 20%)'
  }
  else{
    menubgImgStyle = 'radial-gradient(circle at 50% ' + (currentMenuElement + 0.5) / (menuElements.length - 1) * 100 + '%, ' + colorSet[0][0] + ' 5%, ' + colorSet[0][1] + ' 15%, ' + colorSet[0][2] + ' 25%, ' + colorSet[0][3] + ' 50%)'
  }

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
        history.push('/year/' + (year - 1));
      }

    }
    else{
      if(day < 0){
        if(month > 1){
          setMonth(month - 1)
          props.changeDate(day, month - 1, year)
          history.push('/month/' +(month - 1)+'/'+year);
        }

      }
      else{
        if(day > 1){
          setDay(day - 1)
          props.changeDate(day - 1, month, year)
          history.push('/day/' + (day - 1)+'/'+month+'/'+year);
        }

      }
    }
  }

  const toFuture = () => {

    console.log(smUp)

    if(month < 0){
      if(year < new Date().getFullYear() + 5){
        setYear(year + 1)
        props.changeDate(day, month, year + 1)
        history.push('/year/' + (year + 1));
      }

    }
    else{
      if(day < 0){
        if(month < 12){
          setMonth(month + 1)
          props.changeDate(day, month + 1, year)
          history.push('/month/' +(month + 1)+'/'+year);
        }

      }
      else{
        var daysInMonth = (month === 2) ? (28 + isLeap(year)) : 31 - (month - 1) % 7 % 2;
        if(day < daysInMonth){
          setDay(day + 1)
          props.changeDate(day + 1, month, year)
          history.push('/day/' + (day + 1)+'/'+month+'/'+year);
        }

      }
    }
  }

  const setMenuItem = (index, action) => {
    if(currentMenuElement === index)
      return;
    setCurrentMenuElement(index)
    action()
  }

  useEffect(() => {

    console.log(props.date)

    if(props.date !== undefined){
      setDay(props.date.day);
      setMonth(props.date.month);
      setYear(props.date.year);
    }


    // history.push('/day/' + day +'/'+ month +'/'+ year);
  }, [])

  var showDateBar;

  return (
    <div className={classes.root}>
      <AppBar className={classes.frontdrop} position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={(e) => setOpenMenu(!openMenu)}
          >
            <MenuIcon/>
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
      <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <Grid container spacing={0} justify="center" alignItems="center" flex={1}>
          <Grid container spacing={0} justify="center" alignItems="center" flex={1} style={{marginLeft: '5px', marginRight: '5px', backgroundImage: `${menubgImgStyle}`}}>
            <Grid className={classes.frontdrop} item xs={12} sm={12/menuElements.length}>
                <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
                  setMenuItem(0 , () => {
                    if(day === -1)
                      setDay(1)
                    if(month === -1)
                      setMonth(1)
                    props.changeDate(day === -1 ? 1 : day, month === -1 ? 1 : month, year)
                    history.push('/day/'+ (day === -1 ? 1 : day) +'/'+ (month === -1 ? 1 : month) +'/'+ year);
                  })               
                }}>{menuElements[0]}</Button>
            </Grid>
            <Grid className={classes.frontdrop} item xs={12} sm={12/menuElements.length}>
                <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
                  setMenuItem(1, () => {
                    setDay(-1)
                    if(month === -1)
                      setMonth(1)
                    props.changeDate(-1, month === -1 ? 1 : month, year)
                    history.push('/month/'+ (month === -1 ? 1 : month) +'/'+ year);   
                  })             
                }}>{menuElements[1]}</Button>
            </Grid>
            <Grid className={classes.frontdrop} item xs={12} sm={12/menuElements.length}>
              <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
                  setMenuItem(2, () => {
                    setDay(-1)
                    setMonth(-1)
                    props.changeDate(-1, -1, year)
                    history.push('/year/' + year);  
                  })
                }}>{menuElements[2]}</Button>
            </Grid>
            <Grid className={classes.frontdrop} item xs={12} sm={12/menuElements.length}>
                <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
                  setMenuItem(3, () => {})
                }}>{menuElements[3]}</Button>
            </Grid>
            <Grid className={classes.frontdrop} item xs={12} sm={12/menuElements.length}>
              <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
                  setMenuItem(4, () => {
                    props.logout()
                    history.push('/')
                  })
                }}>{menuElements[4]}</Button>
            </Grid>
            <Grid className={classes.frontdrop} item xs={12} sm={12/menuElements.length}>
              <Typography> </Typography>
            </Grid>
          </Grid>                
        </Grid>                
      </Collapse>
      <Backdrop className={classes.backdrop} open={openMenu} onClick={(e) => setOpenMenu(false)} />
    </div>
  );
}

export default CalenAppBar;