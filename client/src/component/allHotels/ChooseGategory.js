import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View,Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { IconButton,Button } from 'react-native-paper';
import {fetchRoomByCategory} from '../../reduce/getRoomByCategory'

export default function ChooseGategory({ route, navigation }) {
    const [selectedValue, setSelectedValue] = useState("standerView");
    const [count, setCount] = useState(0);
    const [hotelId,setHotelId]=useState(route.params.hotelId)
   
    
    const dispatch = useDispatch();
    const body={
        view:selectedValue,
        capacity:count,
        hotelId:hotelId
    }
const handleGet=(obj)=>{
    dispatch(fetchRoomByCategory(obj))
}
   
 
console.log('view',selectedValue);
console.log('id',hotelId);
console.log('count',count);
    const plus = () => {
      if (count < 3){

        setCount(count + 1);
      }
    };
  
    const minus = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };



  return (
    <View style={{backgroundColor:'#DCE2FC',height:'100%',width:'100%'}}>
    <View style={{justifyContent:'center'}}>
    <Text style={{fontSize:50,color:'black',marginTop:12,textAlign:"center",marginTop:60}}>Welcome</Text>
    </View>
    <View>
    <Text style={{fontSize:25,marginTop:30,margin:18}}>Choose What suits you the most</Text>
    <Text style={{fontSize:50,color:'black',marginBottom:12,color:'black',textAlign:'center'}}>🤔</Text>
    </View>
    <View style={{backgroundColor:'white',margin:14}}>
    <View style={{justifyContent:'space-between', flexDirection: 'row',margin:10}}>
    <Text style={{fontSize:20,color:'black',marginTop:20}}>Select View:</Text>
    <View style={{  paddingTop: 40,borderWidth: 1, borderColor: 'black', width: '50%',marginTop:18,marginLeft:70}}>
    <Picker
    style={{ height: 50, width: '100%' ,borderWidth:2,borderColor:'black',marginTop:20, position:'absolute', top:-27,}}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Sea View" value="seaView" />
        <Picker.Item label="Standard View" value="standerView" />
      </Picker>
    </View>
    </View>
    <Text style={{height:1,backgroundColor:'#6082B6',marginTop:20,margin:10}}>h</Text>
    <View>
    <View style={{ marginTop: 35, flexDirection: 'row', justifyContent: 'space-between',margin:18 }}>
        <View>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Adults</Text>
        <Text>Age 13 Or Above</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%' }}>
         <IconButton icon="minus-circle-outline" size={30} onPress={minus} />
         <Text style={{fontSize:17}}>{count}</Text>
        <IconButton icon="plus-circle-outline" size={30} color="red" style={{color:'red'}} onPress={plus} />
       </View>
    </View>

    </View>

    </View>
    <Button style={{backgroundColor:'#7CB9E8',width:'50%',marginLeft:99,marginTop:25 }} textColor='black' onPress={()=>{handleGet(body),navigation.navigate('Reservation',{hotelId:hotelId})}} >Search</Button>

    </View>
  )
}
