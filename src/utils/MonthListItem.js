import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, TextField, Button, List, ListItem, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import GotoIcon from '@material-ui/icons/Visibility';

import { useTranslation } from 'react-i18next';

const MonthListItem = ({index, weekday, items, darkMode, appBarTitleColor, pickedStyle, repriceItem, enableEdit, passfoucs, toDay, containerStyle, textStyle}) => {

	const { t, i18n } = useTranslation();
	
	return (
		<ListItem style={{padding: '3px'}}>
			<Grid container spacing={0} justify="flex-start" alignItems="center"
				style={containerStyle}
			>
				<Grid item xs={6} container spacing={0} justify="center" alignItems="center">
					<Grid item xs={6} style={{paddingRight: '50px', textAlign: 'end'}}>
					{/* <TextField
						fullWidth
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
					/> */}
					<Typography
						// color={DateUtils.getWeekDay(index + 1, month, year) === 0 ? "error" : (
						//   DateUtils.getWeekDay(index + 1, month, year) === 6 ? "primary" : "inherit"
						// )}
						style={textStyle}                                        
						>
						{(index + 1)}
					</Typography>
					</Grid>
					<Grid item xs={6} style={{paddingRight: '30px', textAlign: 'end'}}>
					{/* <TextField
						fullWidth
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
					/> */}
					<Typography
						// color={DateUtils.getWeekDay(index + 1, month, year) === 0 ? "error" : (
						//   DateUtils.getWeekDay(index + 1, month, year) === 6 ? "primary" : "inherit"
						// )}
						style={textStyle}        
						>
						{weekday}
					</Typography>
					</Grid>
				</Grid>
				<Grid item xs={4} style={{paddingRight: '15px'}}>
					<TextField
						fullWidth
						// color={pickedStyle === 0 ? 'primary' : 'secondary'}
						color='primary'
						disabled={!enableEdit}
						autoFocus={passfoucs}
						variant='outlined'
						margin='dense'
						label={t('others.total')}
						inputProps={{ style: {textAlign: 'end'} }}
						value={items[(index + 1).toString().padStart(2, "0")] === undefined ? 0 : items[(index + 1).toString().padStart(2, "0")]}
						onChange={(e) => {repriceItem(index, e.target.value)}}
						onKeyPress={(e) => {
							// if(index === items.length - 1)
							//   if(e.key === 'Enter')
							//     addItem();
						}}
					/>
				</Grid>
				<Grid item xs={2} style={{paddingRight: '15px'}}>
					<IconButton
						style={darkMode ? {color: '#fff'} : {color: `${appBarTitleColor[pickedStyle]}`}}
						onClick={() => {
							// removeItem(index);
							toDay(index + 1)
						}}
					>
						<GotoIcon/>
					</IconButton>                            
				</Grid>
			</Grid>
		</ListItem>
	);

}

MonthListItem.protoTypes = {
	index: PropTypes.number.isRequired,
	weekday: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	darkMode: PropTypes.bool.isRequired,
	appBarTitleColor: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	pickedStyle: PropTypes.number.isRequired,
	repriceItem: PropTypes.func.isRequired,
	enableEdit: PropTypes.bool.isRequired,
	passfoucs: PropTypes.bool.isRequired,
	toDay: PropTypes.func.isRequired,
	containerStyle: PropTypes.string.isRequired,
	textStyle: PropTypes.string.isRequired
}

export default MonthListItem;