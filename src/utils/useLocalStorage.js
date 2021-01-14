import React, { useState, useEffect } from "react";

const useLocalStorage = (key, defaultVal) => {

	const [localStorage, setLocalStorage] = useState(
		() => {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : defaultVal;
		}
	)

	const updateLocalStorage = (val) => {
		setLocalStorage(val)
		window.localStorage.setItem(key, JSON.stringify(val));
	}

	return [localStorage, updateLocalStorage]
}

export default useLocalStorage;