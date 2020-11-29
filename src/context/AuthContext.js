import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

const AuthProvider = (props) => {

	const [loggedin, setLoggedIn] = useState(false);

	const [user_id, setUserId] = useState('');
	const [loginToken, setLoginToken] = useState('');

	return (
		// <AuthContext.Provider value={{loggedin, user_id, loginToken, setLoggedIn, setUserId, setLoginToken}}>
		<AuthContext.Provider value={{loggedin, user_id, loginToken, setLoggedIn, setUserId, setLoginToken}}>
			{props.children}
		</AuthContext.Provider>
	);
}
 
export default AuthProvider;