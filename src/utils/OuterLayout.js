import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Divider, Grid, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const OuterLayout = ({muiTheme, viewVariant, total, showItems, addItem, menubgImgStyle}) => {

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			<div style={{paddingLeft: '10px', paddingRight: '10px'}}>
				<Grid item container spacing={0} justify="flex-end" alignItems="center" style={{paddingTop: '4px', paddingBottom: '4px', margin: '5px'}}>
					<Grid item xs={6} sm={2} style={{textAlign: 'center'}}>
					<Typography>{viewVariant} total: </Typography>
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
							}}>Add item</Button>
							</div>
						</Grid>     
					}     
				</Grid>     
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
	menubgImgStyle: PropTypes.string,
}

export default OuterLayout;