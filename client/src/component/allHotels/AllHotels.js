import React, { useState,useEffect } from 'react'
import { View ,Image,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector ,useDispatch} from 'react-redux';
import { AllHotell } from '../../reduce/AllHotels';
import { IconButton,Button } from 'react-native-paper';

 function AllHotels({navigation}) {

const dispatch=useDispatch()
useEffect(()=>{
dispatch(AllHotell())
},[])
const hotel=useSelector(state=>state.allHotels.hotels)
console.log('hotel');

  return (
    <ScrollView>
    <Icon name='arrow-back' size={30} style={{marginTop:25,marginLeft:20,backgroundColor:'#89CFF0',width:29,borderRadius:19}}/>
    <View style={styles.searchInputContainer}>
  <Icon name="search" size={30} style={styles.icon} />
  <TextInput
    placeholder="Search"
    style={styles.input}
  />
  <Button style={styles.Button}>Search</Button>
</View>
    {hotel.map((e)=>{
     return   e.hotel.map((i)=>(
       <TouchableOpacity style={{shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.25, shadowRadius: 3.84,elevation:5,marginTop:-15}} onPress={()=>navigation.navigate('ChooseGategory',{hotelId:i.id})} >
    <View style={{marginTop: 50 , flexDirection: 'row', alignItems: 'center'}}>
    <View style={{marginRight: 20 }}>
        <Image source={{uri:'https://image.resabooking.com/images/hotel/Concorde_Green_Park_Palace_3.jpg'}} style={{width: 150, height: 150,marginLeft:16,borderRadius:10,borderTopLeftRadius: 15,borderTopRightRadius: 15,}} />
    </View>
    <View style={{marginTop:-20}}>
        <Text style={{fontSize:20,color:'black',marginBottom:12,color:'black'}}>{i.name}</Text>
        <View style={{flexDirection:'row'}}>  
        <Icon size={20} name='star'style={{marginBottom:15}} color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        </View>
        <Text style={{marginLeft:1,marginBottom:15,color:'black'}}>Rooms:{i.rooms}</Text>
        <Text style={{color:'black'}}><Icon size={20} name='location-pin'/>{i.location}</Text>
    </View>
</View>
 <View style={{padding:10}}>
<Text style={{height:1,width:'100%', backgroundColor:'#DCE2FC',marginTop:15,}}>h</Text>
</View>
 </TouchableOpacity>  
        
        ))  
    })}
 
 </ScrollView>
  )
}
const styles=StyleSheet.create({
  // searchInputContainer: {
  //   height: 50,
  //   width:'70%',
  //   backgroundColor:'#f9f9f9',
  //   marginTop: 15,
  //   marginLeft: 20,
  //   borderTopLeftRadius: 30,
  //   borderBottomLeftRadius: 30,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  searchInputContainer: {
    width:'82%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 23,
    backgroundColor: '#fff',
    marginLeft:49,
    marginTop:30
  },
  input: {
    flex: 1,
    borderRadius: 15,
    width:'50%',
    fontSize: 20,
    paddingLeft: 10,
    borderWidth: 0,
    outline: 'none',
  },
  icon: {
    marginLeft: 10,
    color: '#333',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: '#007bff',
    color: '#0000FF',
    borderRadius: 15,
  },
})
export default AllHotels