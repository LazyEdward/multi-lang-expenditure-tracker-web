import React, { useEffect, useState, useContext }  from 'react';
import {AuthContext} from '../context/AuthContext.js'
import {StyleContext} from '../context/StyleContext.js'
import {DateContext} from '../context/DateContext.js'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import LoginIcon from '@material-ui/icons/AccountBox';
import RegIcon from '@material-ui/icons/Create';

import {useHistory} from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

import { useTranslation } from 'react-i18next';

// import link from '../utils/restful'

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

function Login(props) {
	const classes = useStyles();

	const {loggedin, setLoggedIn, setUserId, setLoginToken} = useContext(AuthContext);
	const {day, month, year, changeDate} = useContext(DateContext);
	const {colorSet, pickedStyle} = useContext(StyleContext);

	const { t, i18n } = useTranslation();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorLogin, setErrorLogin] = useState('')

	// const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF5588', '#FF396C', '#FF1C4F', '#FF0033']]

	var loginImgStyle = 'linear-gradient(rgba(0,41,132,0.4), rgba(0,61,173,0.65), rgba(0,82,214,0.7), rgba(0,102,255,0.9))';
	var menubgImgStyle = 'radial-gradient(circle at 50% 50%, ' + colorSet[0][0] + ' 5%, ' + colorSet[0][1] + ' 15%, ' + colorSet[0][2] + ' 25%, ' + colorSet[0][3] + ' 50%)';

	const [isRegister, setIsRegister] = useState(false);

	var menubgImgStyle2 = 'radial-gradient(circle at ' + (isRegister ? 1.5 : 0.5) / 2 * 100 + '% 50%, ' + colorSet[0][0] + ', ' + colorSet[0][1] + ', ' + colorSet[0][2] + ', ' + colorSet[0][3] + ' 20%)'
	
	const history = useHistory();

	const toDay = () => {
		changeDate(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear())
		history.push('/day/' + (new Date().getDate()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getFullYear()));
	}
	
	useEffect(() => {

		// console.log(Object.keys(i18n.store.data))

		// if(loggedin){
		// 	console.log(changeDate);
			// changeDate(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear())
			setLoggedIn(true)
			toDay();
		// }
	}, [])

	const register = () => {
		if(username.trim().length < 1 || email.trim().length < 1 || password.trim().length < 1){
			setErrorLogin('User Name/Email/password cannot be empty')
			return;
		}

		var data = {
			user_name: username,
			email: email,
			password: password
		}

		// Promise.resolve(fetch(link + 'api/register',{
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// 	headers: {
		// 		'Content-Type' : 'application/json'
		// 	}
		// })).then((res) => {
		// 	if(res.ok){
		// 		setIsRegister(false);
		// 	}
		// 	else{
		// 		console.log('404')
		// 		setErrorLogin('Email is already registered. Please try another one')
		// 		return;
		// 	}
		// }).catch((err) => {
		// 	console.log(err)
		// 	setErrorLogin('Server error. Please try again later')
		// 	return;
		// })
	}

	const login = () => {

		if(email.trim().length < 1 || password.trim().length < 1){
			// local login
			changeDate(day, month, year);
					
			setUserId('');
			// setLoginToken(jsonData.token);
			setLoggedIn(true)
			// props.login();
			toDay();

			// setErrorLogin('Email/password cannot be empty')
			return;
		}

		var data = {
			email: email,
			password: password
		}

		// Promise.resolve(fetch(link + 'api/login',{
		// 	method: 'POST',
		// 	body: JSON.stringify(data),
		// 	headers: {
		// 		'Content-Type' : 'application/json'
		// 	}
		// })).then((res) => {
		// 	if(res.ok){
		// 		Promise.resolve(res.json()).then((jsonData) => {
		// 			changeDate(day, month, year);
					
		// 			setUserId(jsonData.user_id);
		// 			setLoginToken(jsonData.token);
		// 			setLoggedIn(true)
		// 			// props.login();
		// 			toDay();
		// 		}).catch((err) => {
		// 			console.log(err)
		// 			setErrorLogin('Server error. Please try again later')
		// 			return;
		// 		})
		// 	}
		// 	else{
		// 		console.log('404')
		// 		setErrorLogin('Email/password is invalid')
		// 		return;
		// 	}
		// }).catch((err) => {
		// 	console.log(err)
		// 	setErrorLogin('Server error. Please try again later')
		// 	return;
		// })

		// props.changeDate(day, month, year)
		// props.login();
		// toDay();
	}

	var logo = <div style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '40vh', backgroundImage: 'url(' + 'img/logo.png' +')', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} />

	// https://stackoverflow.com/questions/55647969/how-to-get-one-elements-to-slide-in-while-the-other-slides-out-using-react-and
	var showLogin = <Grid container spacing={0} direction="column" justify="center" alignItems="center" style={{marginTop: '45vh'}}>
						<Grid container item justify="center" alignItems="center" flex={1} style={{maxWidth: '300px', backgroundImage: `${menubgImgStyle2}`, paddingTop: '4px', paddingBottom: '4px'}}>
							<Grid container item xs={6} justify="center" alignItems="center" >
								<Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
									setIsRegister(false)
								}}
									startIcon={<LoginIcon/>}
								>{t('login.Login')}</Button>
							</Grid>         
							<Grid container item xs={6} justify="center" alignItems="center" >
								<Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
									setIsRegister(true)
								}}
								startIcon={<RegIcon/>}
								>{t('login.Register')}</Button>
							</Grid>         
						</Grid>         
						<Grid item>
						</Grid>                  
						<Grid item>
						</Grid>
						{isRegister ?
							<Fade in={isRegister} mountOnEnter unmountOnExit>
								<Grid container spacing={0} direction="column" justify="center" alignItems="center" style={{paddingTop: '4px', paddingBottom: '4px'}}>
									<Grid container item justify="center" alignItems="center" style={{maxWidth: '300px', paddingTop: '4px', paddingBottom: '4px'}}>
										<TextField
											fullWidth
											error={errorLogin !== ''}
											helperText={errorLogin}
											margin="dense"
											label={t("login.User Name")}
											variant="outlined"
											onClick={() => setErrorLogin('')}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</Grid>                  
									<Grid container item justify="center" alignItems="center" style={{maxWidth: '300px', paddingTop: '4px', paddingBottom: '4px'}}>
										<TextField
											fullWidth
											error={errorLogin !== ''}
											helperText={errorLogin}
											margin="dense"
											label={t("login.Email")}
											variant="outlined"
											onClick={() => setErrorLogin('')}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Grid>                  
									<Grid container item justify="center" alignItems="center" style={{maxWidth: '300px', paddingTop: '4px', paddingBottom: '4px'}}>
										<TextField
											fullWidth
											margin="dense"
											label={t("login.Password")}
											type="password"
											autoComplete="current-password"
											variant="outlined"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Grid>							
								</Grid>
							</Fade>
							:
							null
						}
						{isRegister ? null
							:
							<Fade in={!isRegister} mountOnEnter unmountOnExit>
								<Grid container spacing={0} direction="column" justify="center" alignItems="center" style={{paddingTop: '4px', paddingBottom: '4px'}}>
									<Grid container item justify="center" alignItems="center" style={{maxWidth: '300px', paddingTop: '4px', paddingBottom: '4px'}}>
										<TextField
											fullWidth
											error={errorLogin !== ''}
											helperText={errorLogin}
											margin="dense"
											label={t("login.Email")}
											variant="outlined"
											onClick={() => setErrorLogin('')}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Grid>                  
									<Grid container item justify="center" alignItems="center" style={{maxWidth: '300px', paddingTop: '4px', paddingBottom: '4px'}}>
										<TextField
											fullWidth
											margin="dense"
											label={t("login.Password")}
											type="password"
											autoComplete="current-password"
											variant="outlined"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Grid>
								</Grid>
							</Fade>
						}   
						<Grid container item justify="center" alignItems="center" style={{maxWidth: '300px', backgroundImage: `${menubgImgStyle}`, paddingTop: '4px', paddingBottom: '4px', margin: '5px 0px'}}>
							<Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
								if(isRegister)
									register();
								else								
									login();
							}}>{t('login.Confirm')}</Button>
						</Grid>                  
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

	return (
		<div style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '40vh', backgroundImage: `${loginImgStyle}` + ', url(' + 'img/usd-2874026_1280.jpg' +')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} >
			{logo}
			{showLogin}
		</div>
	);
}

export default Login;