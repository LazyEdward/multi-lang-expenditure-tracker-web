import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, TextField, Button, List, ListItem, Paper } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/DeleteForever';

const DayListItem = ({index, val, items, darkMode, appBarTitleColor, pickedStyle, renameItem, repriceItem, addItem, removeItem, passfoucs}) => {

	return (
		<ListItem style={{padding: '3px'}}>
			<Grid container spacing={0} justify="flex-start" alignItems="center">
			<Grid item xs={6} style={{paddingRight: '15px'}}>
				<TextField
					fullWidth
					color={pickedStyle === 0 ? 'primary' : 'secondary'}
					variant='outlined'
					margin='dense'
					label='item'
					value={val.name}
					onChange={(e) => {renameItem(index, e.target.value)}}
					// onKeyPress={(e) => {
					//   if(index === items.length - 1)
					//     if(e.key === 'Enter')
					//       changeFocus();
					// }}
				/>
			</Grid>
			<Grid item xs={4} style={{paddingRight: '15px'}}>
				<TextField
					fullWidth
					color='primary'
					autoFocus={passfoucs}
					variant='outlined'
					margin='dense'
					label='price'
					inputProps={{ style: {textAlign: 'end'} }}
					value={val.price}
					onChange={(e) => {repriceItem(index, e.target.value)}}
					onKeyPress={(e) => {
						if(index === items.length - 1)
							if(e.key === 'Enter')
								addItem();
					}}
				/>
			</Grid>
			<Grid item xs={2} style={{paddingRight: '15px'}}>
				<IconButton
					// color="primary"
					style={darkMode ? {color: '#fff'} : {color: `${appBarTitleColor[pickedStyle]}`}}
					onClick={() => {
						removeItem(index);
					}}
				>
					<RemoveIcon/>
				</IconButton>                            
			</Grid>
			</Grid>
		</ListItem>
	);

}

DayListItem.protoTypes = {
	index: PropTypes.number.isRequired,
	val: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired,
	darkMode: PropTypes.bool.isRequired,
	appBarTitleColor: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	pickedStyle: PropTypes.number.isRequired,
	renameItem: PropTypes.func.isRequired,
	repriceItem: PropTypes.func.isRequired,
	addItem: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired,
	passfoucs: PropTypes.bool.isRequired
}

export default DayListItem;