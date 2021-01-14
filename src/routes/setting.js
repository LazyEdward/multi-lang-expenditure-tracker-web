import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../context/AuthContext.js'
import {StyleContext} from '../context/StyleContext.js'
import {DateContext} from '../context/DateContext.js'
import {DataStoreContext} from '../context/DataStoreContext.js'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Switch from '@material-ui/core/Switch';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

import CssBaseline from '@material-ui/core/CssBaseline';

import {useHistory} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

// https://stackoverflow.com/questions/63150232/react-js-material-ui-how-to-format-textfield-as-an-amount

import link from '../utils/restful'
import { Divider, Grid, TextField, Button, List, ListItem, Paper } from '@material-ui/core';

const Setting = (props) => {
  const history = useHistory();

  const {loggedin, setLoggedIn, setUserId, setLoginToken} = useContext(AuthContext);

  const {lastUpdate, edited, data, data_copy, setLastUpdate, makeChange, setData, setDataCopy} = useContext(DataStoreContext);
  const {colorSet, appBarTitleColor, pickedStyle, setPickedStyle, darkMode, setDarkMode, muiTheme} = useContext(StyleContext);

  const [openColors, setOpenColors] = useState(false);

  // const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF5588', '#FF396C', '#FF1C4F', '#FF0033']]
  var menubgImgStyle = 'radial-gradient(circle at 50% 50%, ' + colorSet[pickedStyle][0] + ' 5%, ' + colorSet[pickedStyle][1] + ' 15%, ' + colorSet[pickedStyle][2] + ' 25%, ' + colorSet[pickedStyle][3] + ' 50%)';

  const toHome = () => {
    history.push('/');
  }

  const changeDarkMode = () => {
	// makeChange(true);
	setDarkMode(!darkMode);
  }

  const closeColors = () => {
    setOpenColors(false)
  }

  const clickOpenColors = () => {
    setOpenColors(true)
  }

  const setPicked = (index) => {
	// makeChange(true);
    setPickedStyle(index)
  }

  var colorsDialog = <Dialog open={openColors} onClose={closeColors}>
								<DialogTitle>
									Select Theme
								</DialogTitle>
								<DialogContent style={{display: 'flex'}}>
									{appBarTitleColor.map((value, index) => (
										<Paper key={index} onClick={() => {setPicked(index); closeColors()}} style={{width: '50px', height: '50px', backgroundColor: value, margin: '10px'}}/>))
									}
								</DialogContent>
					</Dialog>

  useEffect(() => {

  }, [])

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			{colorsDialog}
			<div>
				<Grid container spacing={0} item justify="center" alignItems="center">
					<Grid item xs={12}>          
					<Paper elevation={0} style={darkMode ? {maxHeight: '70vh', overflow: 'auto', backgroundColor: '#303030'} : {maxHeight: '70vh', overflow: 'auto'}}>
							<List>
								<ListItem onClick={changeDarkMode}>
									<Grid container spacing={0} justify="flex-start" alignItems="center">
										<Grid item xs={10} style={{paddingLeft: '15px'}}>
											<Typography>Dark Mode</Typography>
										</Grid>
										<Grid item xs={2} style={{textAlign: 'end'}}>
											<Switch
												checked={darkMode}
												onChange={changeDarkMode}
												color="primary"
											/>                            
										</Grid>
									</Grid>
								</ListItem>
								<Divider/>
								<ListItem onClick={clickOpenColors}>
									<Grid container spacing={0} justify="flex-start" alignItems="center">
										<Grid item xs={10} style={{paddingLeft: '15px'}}>
											<Typography>Color Theme</Typography>
										</Grid>
										<Grid item xs={2} style={{textAlign: 'end'}}>
										<IconButton style={{color: `${appBarTitleColor[pickedStyle]}`}}>
											<OpenInNewIcon/>
										</IconButton>    
										</Grid>
									</Grid>
								</ListItem>
								<Divider/>
							</List>
						</Paper>
					</Grid>    
				</Grid>     
			</div>
		</ThemeProvider>
	);
}

export default Setting;