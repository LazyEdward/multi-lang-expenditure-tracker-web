import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../context/AuthContext.js'
import {StyleContext} from '../context/StyleContext.js'
import {DateContext} from '../context/DateContext.js'
import {DataStoreContext} from '../context/DataStoreContext.js'

import {useHistory} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import deepComparison from '../utils/deepComparison.js'

import OuterLayout from '../utils/OuterLayout.js'
import DayListItem from '../utils/DayListItem.js'

// https://stackoverflow.com/questions/63150232/react-js-material-ui-how-to-format-textfield-as-an-amount

// import link from '../utils/restful'
import { Divider, Grid, TextField, Button, List, ListItem, Paper } from '@material-ui/core';

const Day = (props) => {
  const history = useHistory();

	const { t, i18n } = useTranslation();

  const {loggedin, setLoggedIn, setUserId, setLoginToken} = useContext(AuthContext);
  const {day, month, year, changeDate} = useContext(DateContext);
  const {lastUpdate, edited, data, data_copy, setLastUpdate, makeChange, setData, setDataCopy} = useContext(DataStoreContext);
  const {colorSet, appBarTitleColor, darkMode, pickedStyle, muiTheme} = useContext(StyleContext);

  const [total, setTotal] = useState(0)
  const [itemsInit, setItemsInit] = useState(null);
  const [items, setItems] = useState(null);

  const [passfoucs, setPassFoucs] = useState(false);

  // const colorSet = [['#0066FF', '#0052D6', '#003DAD', '#002984'], ['#FF5588', '#FF396C', '#FF1C4F', '#FF0033']]
  var menubgImgStyle = 'radial-gradient(circle at 50% 50%, ' + colorSet[pickedStyle][0] + ' 5%, ' + colorSet[pickedStyle][1] + ' 15%, ' + colorSet[pickedStyle][2] + ' 25%, ' + colorSet[pickedStyle][3] + ' 50%)';

  const toHome = () => {
    history.push('/');
  }

  
  const saveChange = () => {
    if(edited){

      for(var i = 0; i < items.length; i++){
        if(items[i].price === '')
          items[i].price = '0'
      }

      const newData = {...data};

      if(items === null || items.length < 1){

        if(newData !== null){
          if(newData[year] !== undefined){
            if(newData[year][month.toString().padStart(2, "0")] !== undefined){
              if(newData[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")] !== undefined)
                delete newData[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")];
            }
          }
        }

      }
      else{
        if(newData === null)
          newData = {}
        
        if(newData[year] === undefined)
          newData[year] = {}
        
        if(newData[year][month.toString().padStart(2, "0")] === undefined)
          newData[year][month.toString().padStart(2, "0")] = {}
        
        if(newData[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")] === undefined)
          newData[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")] = {}

        newData[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")].items = items;
        newData[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")].total = total;
      }

      setData(newData);
      setItemsInit({...items});
      makeChange(false)
    }
  }

  const addItem = () => {
    setPassFoucs(true);

    // makeChange(true)

    const newItems = [...items];

    if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
      newItems[newItems.length - 1].price = '0';

    newItems.push({ name: t('daily.new') + (newItems.length + 1), price: '' });

    console.log(deepComparison(itemsInit, newItems));
    makeChange(!deepComparison(itemsInit, newItems))

    setItems(newItems);
  }

  const removeItem = (index) => {

    // makeChange(true)

    const newItems = [...items];

    if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
      newItems[newItems.length - 1].price = '0';

    newItems.splice(index, 1);

    console.log(deepComparison(itemsInit, newItems));
    makeChange(!deepComparison(itemsInit, newItems))

    setItems(newItems);
    setTotal(newItems.map(val => parseFloat(val.price) * 100).reduce((a, b) => {return a + b} , 0) / 100)
  }

  const renameItem = (index, name) => {
    
    // makeChange(true)

    console.log(name)

    const newItems = [...items];

    if(index !== newItems.length - 1)
      if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
        newItems[newItems.length - 1].price = '0';

    newItems[index].name = name;

    console.log(deepComparison(itemsInit, newItems));
    makeChange(!deepComparison(itemsInit, newItems))

    setItems(newItems);
  }

  const repriceItem = (index, price) => {

    // makeChange(true)

    if(price !== '' && !/^\d+(?:\.\d{0,2})?$/.test(price))
      return

    if(isNaN(price))
      price = 0

    const newItems = [...items];

    if(index !== newItems.length - 1)
      if(newItems.length > 0 && newItems[newItems.length - 1].price === '')
        newItems[newItems.length - 1].price = '0';

    // newItems[index].price = Number(price);
    newItems[index].price = price === '' ? '0' : price;

    console.log(deepComparison(itemsInit, newItems));
    makeChange(!deepComparison(itemsInit, newItems))

    setTotal(newItems.map(val => parseFloat(val.price) * 100).reduce((a, b) => {return a + b} , 0) / 100)
    setItems(newItems);
    // setTotal(total + Number(price))
  }

  useEffect(() => {

    // console.log('testChange')

    if(!loggedin){
      toHome();
      return;
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

    // test data

    var items = [
      // { name: 'test1', price: 50 },
      // { name: 'test2', price: 20 },
      // { name: 'test21', price: 40 },
      // { name: 'test25', price: 22 },
      // { name: 'test12', price: 27 },
      // { name: 'test112', price: 20 },
      // { name: 'test n', price: 15 }
    ]

    if(data !== null){
      if(data[year] !== undefined){
        if(data[year][month.toString().padStart(2, "0")] !== undefined){
          if(data[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")] !== undefined)
            items = data[year][month.toString().padStart(2, "0")][day.toString().padStart(2, "0")].items;
        }
      }
    }

    setPassFoucs(false);

    setItems(items);
    setItemsInit({...items});
    setTotal(items.map(val => val.price * 100).reduce((a, b) => {return a + b} , 0) / 100)

  }, [props.match.params, data])


  var showItems;

  if(items === null || items.length <= 0){
    showItems = null
  }
  else{
    showItems = <Paper style={{maxHeight: '47vh', overflow: 'auto'}}>
                      <List style={{padding: '5px 8px'}}>
                        {items.map((val, index) => 
                          <div key={index}>
                            {index === 0 ? null : <Divider/>}
                            <DayListItem
                              index={index}
                              val={val}
                              items={items}
                              darkMode={darkMode}
                              appBarTitleColor={appBarTitleColor}
                              pickedStyle={pickedStyle}
                              renameItem={renameItem}
                              repriceItem={repriceItem}
                              addItem={addItem}
                              removeItem={removeItem}
                              passfoucs={passfoucs}
                              />
                            {/* <ListItem style={{padding: '3px'}}>
                              <Grid container spacing={0} justify="flex-start" alignItems="center">
                                <Grid item xs={6} style={{paddingRight: '15px'}}>
                                  <TextField
                                    fullWidth
                                    color={pickedStyle === 0 ? 'primary' : 'secondary'}
                                    color='primary'
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
                                    style={{color: `${appBarTitleColor[pickedStyle]}`}}
                                    onClick={() => {
                                      removeItem(index);
                                    }}
                                    >
                                    <RemoveIcon/>
                                  </IconButton>                            
                                </Grid>
                              </Grid>
                            </ListItem> */}
                          </div>
                        )}
                      </List>
                    </Paper>

  }


	return (
    // <ThemeProvider theme={muiTheme}>
    //   <CssBaseline />
    //   <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
    //       <Grid item container spacing={0} justify="flex-end" alignItems="center" style={{paddingTop: '4px', paddingBottom: '4px', margin: '5px'}}>
    //         <Grid item xs={6} sm={2} style={{textAlign: 'center'}}>
    //           <Typography>Daily total: </Typography>
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
    //       <Grid item xs={12} sm={10}>          
    //         {showItems}
    //       </Grid>     
    //       <Grid item xs={12} sm={6} style={{paddingTop: '10px'}}>          
    //         <div style={{backgroundImage: `${menubgImgStyle}`, paddingTop: '4px', paddingBottom: '4px'}}>
    //           <Button style={{color: 'white', textTransform: 'none'}} fullWidth align="center" onClick={() => {
    //               addItem()
    //           }}>Add item</Button>
    //         </div>
    //       </Grid>     
    //     </Grid>     
    //   </div>
    // </ThemeProvider>
    <OuterLayout
      muiTheme={muiTheme}
      viewVariant={'Daily'}
      total={total}
      showItems={showItems}
      addItem={addItem}
      edited={edited}
      saveChange={saveChange}
      menubgImgStyle={menubgImgStyle}
    />
  );
}

export default Day;