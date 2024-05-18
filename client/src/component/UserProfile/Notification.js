import React,{useEffect,} from 'react'
import { View ,Text,} from 'react-native'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getNegotiation } from '../../reduce/negotiation'
import { useDispatch ,useSelector} from 'react-redux'
import io from 'socket.io-client';
import { AP_ADRESS } from '../../apAdress'
const socket = io(`http://${AP_ADRESS}:3000`); 
export default function Notification({navigation}) {

  
  

const dispatch=useDispatch()

const getWhereHotelId=async()=>{
    dispatch(getNegotiation())
}
useEffect(() => {

  socket.connect();
  socket.on('Received_request', (data) => {
    console.log('Received data:', data);
    if (Array.isArray(data)) {
      
      data.map((item, index) => {
      return  console.log('Item:', item);
        
      });
    }
  });
  return () => socket.disconnect();
}, []);



const nego=useSelector(state=>state.getNegotiations.get)
console.log('nego',nego);
  return (
    <View style={{flex:1}}>
        <View style={{backgroundColor:'#F0F8FF'}}>
            <Icon name='arrow-back' size={30} style={{marginTop:10}} onPress={()=>navigation.navigate('UserProfile')}/>
        <Text style={{textAlign:'center',fontSize:20,color:'black'}}>Notification</Text>
        </View>
        <View style={{marginTop:18,justifyContent:'space-between',flexDirection:'row'}}>
            <View style={{marginLeft:8}}>
            <Text style={{fontSize:17,color:'black'}}>Content:</Text>
            <Text style={{fontSize:16,color:'black'}}>Price:</Text>
            <Text style={{fontSize:16,color:'black'}}>Room N°:</Text>

                </View>
              <View>
                <Text style={{marginLeft:70}}>12-04-2024</Text>
            <View style={{alignItems:'center',flexDirection:'row',marginTop:30}}>
            <Button  style={{width:80,color:"red",marginTop:10}} textColor='red'>Cancel</Button>
            <Button  style={{width:80,Color:"black",marginTop:10,borderWidth:1,borderColor:'#B0C4DE'}} textColor='green'>Accept</Button>
            </View>
              </View>
        </View>
    </View>
  )
}
