import React, { useState,useEffect } from 'react'
import { View ,Image,Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector ,useDispatch} from 'react-redux';
import { AllHotell } from '../../reduce/AllHotels';
export default function AllHotels() {

const dispatch=useDispatch()
useEffect(()=>{
dispatch(AllHotell())
},[])
const hotel=useSelector(state=>state.allHotels.hotels)
console.log('hotel',hotel);

  return (
    <ScrollView>
    <Icon name='arrow-back' size={30} style={{marginTop:25,marginLeft:20,backgroundColor:'#89CFF0',width:29,borderRadius:19}}/>
     <View style={{justifyContent:'center'}}>
    <Text style={{textAlign:'center',fontSize:50,color:'blue'}}>all hotels</Text>
    </View>
    {hotel.map((e)=>{
     return   e.hotel.map((i)=>(
            <View style={{shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.25, shadowRadius: 3.84,elevation: 5,}}>
    <View style={{marginTop: 75, flexDirection: 'row', alignItems: 'center'}}>
    <View style={{marginRight: 20 }}>
        <Image source={{uri:'https://image.resabooking.com/images/hotel/Concorde_Green_Park_Palace_3.jpg'}} style={{width: 150, height: 150,marginLeft:16,borderRadius:10}} />
    </View>
    <View style={{marginTop:-20}}>
        <Text style={{fontSize:20,color:'black',marginBottom:12,color:'black'}}>{i.name}</Text>
        <View style={{flexDirection:'row'}}>
        <Icon size={20} name='star-border'style={{color:'yellow',marginBottom:15}} />
        <Icon size={20} name='star-border'style={{color:'yellow'}} />
        <Icon size={20} name='star-border'style={{color:'yellow'}} />
        <Icon size={20} name='star-border'style={{color:'yellow'}} />
        <Icon size={20} name='star-border'style={{color:'yellow'}} />

        </View>
        <Text style={{marginLeft:1,marginBottom:15,color:'black'}}>Rooms:{i.rooms}</Text>
        <Text style={{color:'black'}}><Icon size={20} name='location-pin'/>{i.location}</Text>
    </View>
</View>
 <View style={{padding:10}}>
<Text style={{height:1,width:'100%', backgroundColor:'#DCE2FC',marginTop:30,}}>h</Text>
</View>
 </View>  
        
        ))  
    })}
 
 </ScrollView>
  )
}