import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Divider, Grid, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

const OuterLayout = ({muiTheme, viewVariant, total, showItems, addItem, edited, saveChange, menubgImgStyle}) => {

	const { t, i18n } = useTranslation();

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			<div style={{paddingLeft: '10px', paddingRight: '10px'}}>
				<Grid item container spacing={0} justify="flex-end" alignItems="center" style={{paddingTop: '4px', paddingBottom: '4px', margin: '5px'}}>
					<Grid item xs={6} sm={2} style={{textAlign: 'center'}}>
					<Typography>{t(`${viewVariant.toLowerCase()}.total`)}</Typography>
					</Grid>
					<Grid item xs={6} sm={3} style={{paddingRight: '2vw'}}>
					<TextField
						disabled={true}
						fullWidth
						variant='outlined'
						margin='dense'
						inputProps={{ style: {textAlign: 'end'} }}
						value={total}
					/>
					</Grid>
				</Grid>
				<Divider/>
				<Grid item>
				<Typography paragraph/>
				</Grid>
				<Grid container spacing={0} item justify="center" alignItems="center">
					{viewVariant === 'Daily' ?
						<Grid item xs={12} sm={10}>          
							{showItems}
						</Grid>
						:
						showItems
					}
					{(addItem === null || addItem === undefined) ?
						<Grid item>
							<Typography paragraph/>
						</Grid>
						:
						<Grid item xs={12} sm={6} style={{paddingTop: '10px'}}>          
							<div style={{backgroundImage: `${menubgImgStyle}`, paddingTop: '4px', paddingBottom: '4px'}}>
							<Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
								addItem()
							}}>{t('daily.add')}</Button>
							</div>
						</Grid>     
					}         
				</Grid>     
				{(saveChange === null || saveChange === undefined) ?
					null
					:
					<Grid container spacing={0} item justify="center" alignItems="center">
						<Grid item xs={12} sm={6} style={{paddingTop: '10px'}}>          
							<div style={edited ? {backgroundImage: `${menubgImgStyle}`, paddingTop: '4px', paddingBottom: '4px'} : {backgroundColor: '#AAAAAA', paddingTop: '4px', paddingBottom: '4px'}}>
							<Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" disabled={!edited} onClick={() => {
								saveChange()
							}}>{t('daily.save')}</Button>
							</div>
						</Grid>     
					</Grid>
				} 
			</div>
			</ThemeProvider>
	);

}

OuterLayout.protoTypes = {
	muiTheme: PropTypes.object.isRequired,
	viewVariant: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	showItems: PropTypes.element.isRequired,
	addItem: PropTypes.func,
	edited: PropTypes.bool,
	saveChange: PropTypes.func,
	menubgImgStyle: PropTypes.string,
}

export default OuterLayout;