import React, {createContext, useState} from 'react';
import useLocalStorage from '../utils/useLocalStorage.js'

export const DataStoreContext = createContext();

const DataStoreProvider = (props) => {

	const [lastUpdate, setLastUpdate] = useState(null);
	const [edited, makeChange] = useState(false);

	const [data, setData] = useLocalStorage('data', null);
	const [data_copy, setDataCopy] = useState(null);

	return (
		// <AuthContext.Provider value={{loggedin, user_id, loginToken, setLoggedIn, setUserId, setLoginToken}}>
		<DataStoreContext.Provider value={{
			lastUpdate, edited, data, data_copy,
			setLastUpdate, makeChange, setData, setDataCopy
		}}>
			{props.children}
		</DataStoreContext.Provider>
	);
}
 
export default DataStoreProvider;