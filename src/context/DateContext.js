import React, {createContext, useState} from 'react';

export const DateContext = createContext();

const DateProvider = (props) => {

	const [day, setDay] = useState(-1);
	const [month, setMonth] = useState(-1);
	const [year, setYear] = useState(-1);

	const changeDate = (day, month, year) => {
		setDay(day)
		setMonth(month)
		setYear(year)
		console.log(day+'/'+month+'/'+year)
	  }

	return (
		// <AuthContext.Provider value={{loggedin, user_id, loginToken, setLoggedIn, setUserId, setLoginToken}}>
		<DateContext.Provider value={{day,
			month,
			year,
			changeDate: (day, month, year) => { changeDate(day, month, year) }}
		}>
			{props.children}
		</DateContext.Provider>
	);
}
 
export default DateProvider;