import React, {createContext, useState} from 'react';
import { createMuiTheme } from '@material-ui/core/styles'

export const StyleContext = createContext();

const StyleProvider = (props) => {

	const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF0066', '#E30052', '#C6003D', '#AA0029']]
	const appBarTitleColor = ['#3f50b5', '#f50057']

	const [pickedStyle, setPickedStyle] = useState(1)

	return (
		// <AuthContext.Provider value={{loggedin, user_id, loginToken, setLoggedIn, setUserId, setLoginToken}}>
		<StyleContext.Provider value={{
			colorSet,
			appBarTitleColor,
			pickedStyle,
			setPickedStyle
		}}>
			{props.children}
		</StyleContext.Provider>
	);
}
 
export default StyleProvider;