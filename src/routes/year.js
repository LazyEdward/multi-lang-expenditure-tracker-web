
import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../context/AuthContext.js'
import {StyleContext} from '../context/StyleContext.js'
import {DateContext} from '../context/DateContext.js'
import {DataStoreContext} from '../context/DataStoreContext.js'

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import GotoIcon from '@material-ui/icons/Visibility';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import {useHistory} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import DateUtils from '../utils/DateUtils.js'
import OuterLayout from '../utils/OuterLayout.js'
import YearListItem from '../utils/YearListItem.js'

// https://stackoverflow.com/questions/63150232/react-js-material-ui-how-to-format-textfield-as-an-amount

import link from '../utils/restful'
import { Divider, Grid, TextField, Button, List, ListItem, Paper } from '@material-ui/core';

const Year = (props) => {
	const { t, i18n } = useTranslation();

  const history = useHistory();

  const {loggedin, setLoggedIn, setUserId, setLoginToken} = useContext(AuthContext);
  const {day, month, year, changeDate} = useContext(DateContext);
  const {lastUpdate, edited, data, data_copy, setLastUpdate, makeChange, setData, setDataCopy} = useContext(DataStoreContext);
  const {colorSet, appBarTitleColor, darkMode, pickedStyle, muiTheme} = useContext(StyleContext);

  const smUp = useMediaQuery(muiTheme.breakpoints.up('sm'));

  const [total, setTotal] = useState(0)
  const [items, setItems] = useState(null);

  const [passfoucs, setPassFoucs] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);

  // const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF5588', '#FF396C', '#FF1C4F', '#FF0033']]
  var menubgImgStyle = 'radial-gradient(circle at 50% 50%, ' + colorSet[pickedStyle][0] + ' 5%, ' + colorSet[pickedStyle][1] + ' 15%, ' + colorSet[pickedStyle][2] + ' 25%, ' + colorSet[pickedStyle][3] + ' 50%)';

  const toHome = () => {
    history.push('/');
  }

  const toMonth = (month) => {
		changeDate(-1, month, year)
		history.push('/month/'+ month +'/'+ year);
	}

  const addItem = () => {
    // setPassFoucs(true);

    // makeChange(true)

    // const newItems = [...items];

    // if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
    //   newItems[newItems.length - 1].price = '0';

    // newItems.push({ name: 'New Item' + (newItems.length + 1), price: '' });

    // setItems(newItems);
  }

  const removeItem = (index) => {

    // makeChange(true)

    // const newItems = [...items];

    // if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
    //   newItems[newItems.length - 1].price = '0';

    // newItems.splice(index, 1);

    // setItems(newItems);
    // setTotal(newItems.map(val => parseFloat(val.price) * 100).reduce((a, b) => {return a + b} , 0) / 100)
  }

  const renameItem = (index, name) => {
    
    // makeChange(true)

    // console.log(name)

    // const newItems = [...items];

    // if(index !== newItems.length - 1)
    //   if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
    //     newItems[newItems.length - 1].price = '0';

    // newItems[index].name = name;

    // setItems(newItems);
  }

  const repriceItem = (index, price) => {

    // makeChange(true)

    // if(isNaN(price)){
    //   price = 0
    //   return;
    // }

    // if(!/^\d+(?:\.\d{0,2})?$/.test(price))
    //   return;

    // const newItems = [...items];

    // if(index !== newItems.length - 1)
    //   if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
    //     newItems[newItems.length - 1].price = '0';

    // // newItems[index].price = Number(price);
    // newItems[index].price = price === '' ? '0' : price;
    // setTotal(newItems.map(val => parseFloat(val.price) * 100).reduce((a, b) => {return a + b} , 0) / 100)
    // setItems(newItems);
    // setTotal(total + Number(price))
  }

  useEffect(() => {

    // console.log('testChange')

    if(!loggedin){
      toHome();

    }

    // makeChange(false)

    // console.log(props.loggedin);
    // console.log(props.user_id);
    // console.log(props.loginToken);
    // console.log(props.data);

    // if(!props.loggedin){
    //   toHome();
    // }

    // if(props.data === null){
    //   Promise.resolve(fetch(link + 'api/data/' + props.user_id,{
    //     method: 'GET',
    //     headers: {
    //       'Authorization' : props.loginToken
    //     }
    //   })).then((res) => {
    //     if(res.ok){
    //       Promise.resolve(res.json()).then((jsonData) => {
    //         console.log(jsonData);

    //         if(jsonData.result.years.includes(props.match.params.year)){
    //           Promise.resolve(fetch(link + 'api/data/' + props.user_id + '?year=' + props.match.params.year,{
    //             method: 'GET',
    //             headers: {
    //               'Authorization' : props.loginToken
    //             }
    //           })).then((res) => {
    //             if(res.ok){
    //               Promise.resolve(res.json()).then((jsonData) => {
    //                 console.log(jsonData);
    //                 props.addData(props.match.params.year, jsonData);
    //               }).catch((err) => {
    //                 console.log(err)
    //                 return;
    //               })
    //             }
    //             else{
    //               console.log('404')
    //               return;
    //             }
    //           }).catch((err) => {
    //             console.log(err)
    //             return;
    //           })
    //         }
    //         else{
    //           props.addData(props.match.params.year, null);
    //         }

    //       }).catch((err) => {
    //         console.log(err)
    //         return;
    //       })
    //     }
    //     else{
    //       console.log('404')
    //       return;
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //     return;
    //   })
    // }

    var items = {
      // '01': 100.4,
      // '07': 500.5,
      // '11': 1240,
    }

    if(data !== null){
      if(data[year] !== undefined){
        if(data[year] !== undefined){
            for(var month of Object.keys(data[year])){

              items[month.padStart(2, "0")] = 0;

              for(var day of Object.keys(data[year][month])){
                items[month.padStart(2, "0")] += parseFloat(data[year][month][day].total) * 100;
              }

              items[month.padStart(2, "0")] /= 100;
            }
        }
      }
    }

    console.log(items)

    setItems(items)

    var t = 0;

    for(var key of Object.keys(items))
      t += parseFloat(items[key]) * 100;

    setTotal(t/ 100)

  }, [props.match.params])


  var showItems;

  if(items === null || items.length <= 0){
    showItems = null
  }
  else{
    if(smUp){

      showItems = <Grid item xs={12}>
                    <Paper elevation={0} style={darkMode ? {maxHeight: '65vh', overflow: 'auto', padding: '5px 5px', backgroundColor: '#303030'} : {maxHeight: '65vh', overflow: 'auto', padding: '5px 5px'}}>
                      <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto', gridGap: '2px'}}>
                        {Array.apply(null, Array(12)).map((val, index) => 
                              <Grid container spacing={0} direction="column" justify="center" alignItems="center" key={index}>
                                <Paper style={{padding: '3px', maxWidth: '150px'}}>
                                    <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                                      <Grid item xs={12} container spacing={0} justify="space-between" alignItems="center" style={{padding: '0px 10px'}}>
                                        <Grid item xs={6}>
                                            <Typography>
                                              {DateUtils.months[(index)]}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign: 'end'}}>
                                          <IconButton
                                            style={darkMode ? {color: '#fff'} : {color: `${appBarTitleColor[pickedStyle]}`}}
                                            size="small"
                                            onClick={() => {
                                              // removeItem(index);
                                              toMonth(index + 1)
                                            }}
                                            >
                                              <GotoIcon/>
                                          </IconButton>                            
                                        </Grid>
                                      </Grid>
                                      <Grid item xs={12} style={{padding: '0px 10px'}}>
                                        <TextField
                                          fullWidth
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
                                    </Grid>
                                  </Paper>
                              </Grid>
                            )}
                        </div>
                      </Paper>
                    </Grid>
    }
    else{
      showItems = <Grid item xs={12}>
                    <Paper style={{maxHeight: '65vh', overflow: 'auto'}}>
                        <List style={{padding: '5px 8px'}}>
                          {Array.apply(null, Array(12)).map((val, index) => 
                            <div key={index}>
                              {index === 0 ? null : <Divider/>}
                              <YearListItem
                                index={index}
                                month={DateUtils.months[index]}
                                items={items}
                                darkMode={darkMode}
                                appBarTitleColor={appBarTitleColor}
                                pickedStyle={pickedStyle}
                                repriceItem={repriceItem}
                                enableEdit={enableEdit}
                                passfoucs={passfoucs}
                                toMonth={toMonth}
                              />
                            </div>
                          )}
                        </List>
                      </Paper>
                    </Grid>
                    
      // showItems = <Grid item xs={12}>
      //               <Paper style={{maxHeight: '65vh', overflow: 'auto'}}>
      //                   <List style={{padding: '5px 8px'}}>
      //                     {Array.apply(null, Array(12)).map((val, index) => 
      //                       <div key={index}>
      //                         {index === 0 ? null : <Divider/>}
      //                         <ListItem style={{padding: '3px'}}>
      //                         <Grid container spacing={0} justify="flex-start" alignItems="center">
      //                           {/* <Grid item xs={6} container spacing={0} justify="center" alignItems="center"> */}
      //                             <Grid item xs={6} style={{paddingLeft: '30px', textAlign: 'start'}}>
      //                               {/* <TextField
      //                                 fullWidth
      //                                 variant='outlined'
      //                                 margin='dense'
      //                                 label='item'
      //                                 value={val.name}
      //                                 onChange={(e) => {renameItem(index, e.target.value)}}
      //                                 // onKeyPress={(e) => {
      //                                 //   if(index === items.length - 1)
      //                                 //     if(e.key === 'Enter')
      //                                 //       changeFocus();
      //                                 // }}
      //                               /> */}
      //                               <Typography>{DateUtils.months[(index)]}</Typography>
      //                             </Grid>
      //                           {/* </Grid> */}
      //                           <Grid item xs={4} style={{paddingRight: '15px'}}>
      //                             <TextField
      //                               fullWidth
      //                               color={pickedStyle === 0 ? 'primary' : 'secondary'}
      //                               disabled={!enableEdit}
      //                               autoFocus={passfoucs}
      //                               variant='outlined'
      //                               margin='dense'
      //                               label='total'
      //                               inputProps={{ style: {textAlign: 'end'} }}
      //                               value={items[(index + 1).toString().padStart(2, "0")] === undefined ? 0 : items[(index + 1).toString().padStart(2, "0")]}
      //                               onChange={(e) => {repriceItem(index, e.target.value)}}
      //                               onKeyPress={(e) => {
      //                                 // if(index === items.length - 1)
      //                                 //   if(e.key === 'Enter')
      //                                 //     addItem();
      //                               }}
      //                             />
      //                           </Grid>
      //                           <Grid item xs={2} style={{paddingRight: '15px'}}>
      //                             <IconButton
      //                               style={darkMode ? {color: '#fff'} : {color: `${appBarTitleColor[pickedStyle]}`}}
      //                               onClick={() => {
      //                                 // removeItem(index);
      //                               }}
      //                               >
      //                                 <GotoIcon/>
      //                             </IconButton>                            
      //                           </Grid>
      //                         </Grid>
      //                         </ListItem>
      //                       </div>
      //                     )}
      //                   </List>
      //                 </Paper>
      //               </Grid>
    }

  }


	return (
    // <ThemeProvider theme={muiTheme}>
    //   <CssBaseline />
    //   <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
    //       <Grid item container spacing={0} justify="flex-end" alignItems="center" style={{paddingTop: '4px', paddingBottom: '4px', margin: '5px'}}>
    //         <Grid item xs={6} sm={2} style={{textAlign: 'center'}}>
    //           <Typography>Annual total: </Typography>
    //         </Grid>
    //         <Grid item xs={6} sm={3} style={{paddingRight: '2vw'}}>
    //           <TextField
    //             disabled={true}
    //             fullWidth
    //             variant='outlined'
    //             margin='dense'
    //             inputProps={{ style: {textAlign: 'end'} }}
    //             value={total}
    //           />
    //         </Grid>
    //       </Grid>
    //     <Divider/>
    //     <Grid item>
    //       <Typography paragraph/>
    //     </Grid>
    //     <Grid container spacing={0} item justify="center" alignItems="center">
    //       {/* <Grid item xs={12} sm={8}>           */}
    //         {showItems}
    //       {/* </Grid>      */}
    //       {/* <Grid item xs={12} sm={6} style={{paddingTop: '10px'}}>          
    //         <div style={{backgroundImage: `${menubgImgStyle}`, paddingTop: '4px', paddingBottom: '4px'}}>
    //           <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
    //               // addItem()
    //               setEnableEdit(true)
    //           }}>Edit (Replace monthly information)</Button>
    //         </div>
    //       </Grid> */}
    //       <Grid item>
    //         <Typography paragraph/>
    //       </Grid>     
    //     </Grid>     
    //   </div>
    // </ThemeProvider>
    <OuterLayout
      muiTheme={muiTheme}
      viewVariant={'Annual'}
      total={total}
      showItems={showItems}
      addItem={null}
      // menubgImgStyle={menubgImgStyle}
    />
  );
}

export default Year;