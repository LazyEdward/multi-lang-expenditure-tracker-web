import React, {createContext, useState} from 'react';

export const DataStoreContext = createContext();

const DataStoreProvider = (props) => {

	const [lastUpdate, setLastUpdate] = useState(null);
	const [edited, makeChange] = useState(false);

	const [data, setData] = useState(null);
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