import React, {createContext, useEffect, useState} from 'react';
import { createMuiTheme } from '@material-ui/core/styles'

import useLocalStorage from '../utils/useLocalStorage.js'

export const StyleContext = createContext();

const StyleProvider = (props) => {

	const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF0066', '#E30052', '#C6003D', '#AA0029']]
	const appBarTitleColor = ['#3f50b5', '#f50057']
	const colorError = "#f44336"

	// const [pickedStyle, setPickedStyle] = useState(0)
	// const [darkMode, setDarkMode] = useState(false)

	const [pickedStyle, setPickedStyle] = useLocalStorage('pickedStyle', 0)
	const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

	const muiTheme = createMuiTheme({
		palette: {
		  type: darkMode ? 'dark' : 'light',
		  primary: {
			  main: appBarTitleColor[pickedStyle]
		  },
		},
	})

	// const [muiTheme, setMuiTheme] = useState(createMuiTheme({
	// 	palette: {
	// 	  type: 'light',
	// 	  primary: {
	// 		  main: appBarTitleColor[0]
	// 	  },
	// 	},
	// }));

	// useEffect(() => {
	// 	console.log(darkMode)
	// 	console.log(pickedStyle)
	// 	setMuiTheme(createMuiTheme({
	// 		palette: {
	// 		  type: darkMode ? 'dark' : 'light',
	// 		  primary: {
	// 			  main: appBarTitleColor[pickedStyle]
	// 		  },
	// 		},
	// 	}));

	// }, [darkMode, pickedStyle])

	return (
		// <AuthContext.Provider value={{loggedin, user_id, loginToken, setLoggedIn, setUserId, setLoginToken}}>
		<StyleContext.Provider value={{
			colorSet,
			appBarTitleColor,
			colorError,
			pickedStyle,
			setPickedStyle,
			darkMode,
			setDarkMode,
			muiTheme
		}}>
			{props.children}
		</StyleContext.Provider>
	);
}
 
export default StyleProvider;