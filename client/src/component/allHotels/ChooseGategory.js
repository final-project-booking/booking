import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View,Text ,ScrollView} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { IconButton,Button } from 'react-native-paper';
import {fetchRoomByCategory} from '../../reduce/getRoomByCategory'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ComparPrice } from '../../reduce/comparPrice';

export default function ChooseGategory({ route, navigation }) {
    const [selectedValue, setSelectedValue] = useState("seaView");
    const [selectedPlan, setSelectedPlan] = useState("all_Inclusive");
    const [people, setPeople] = useState(0);
    const [numRoom, setNumRoom] = useState(1);
    const [hotelId,setHotelId]=useState(route.params.hotelId)
   
    
    const dispatch = useDispatch();
    const body={
        view:selectedValue,
        hotelId:hotelId,
            }
const handleGet=(obj)=>{
    dispatch(fetchRoomByCategory(obj))
}
   
 
console.log('view',selectedValue);
console.log('id',hotelId);
console.log('selectedPlan',selectedPlan);
console.log('people',people);
console.log('numRoom',numRoom);

    const plus = () => {
      if (people>=0){

        setPeople(people + 1);
      }
    };
  
    const minus = () => {
      if (people>0) {
        setPeople(people - 1);
      }
    };
    const add = () => {
      if (numRoom>0){
        setNumRoom(numRoom + 1);
      }
    };
  
    const remove = () => {
      if (numRoom>0) {
        setNumRoom(numRoom - 1);
      }
    };



  return (
    <ScrollView>
    <View style={{backgroundColor:'#DCE2FC',height:'100%',width:'100%'}}>
    <View style={{justifyContent:'center'}}>
    <Text style={{fontSize:50,color:'black',marginTop:12,textAlign:"center",marginTop:20}}>Welcome</Text>
    </View> 
    <View>
    <Text style={{fontSize:25,marginTop:15,margin:18}}>Choose What suits you the most</Text>
    <Text style={{fontSize:50,color:'black',marginBottom:12,color:'black',textAlign:'center'}}>🤔</Text>
    </View>
    <View style={{backgroundColor:'white',margin:14,borderRadius:30}}>
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
    <Text style={{height:1,backgroundColor:'#6082B6',marginTop:15,margin:10}}>h</Text>

    <View style={{justifyContent:'space-between', flexDirection: 'row',margin:10}}>
    <Text style={{fontSize:20,color:'black',marginTop:20}}>Meal_Plan:</Text>
    <View style={{  paddingTop: 40,borderWidth: 1, borderColor: 'black', width: '50%',marginTop:18,marginLeft:70}}>
    <Picker
    style={{ height: 50, width: '100%' ,borderWidth:2,borderColor:'black',marginTop:20, position:'absolute', top:-27,}}
        selectedValue={selectedPlan}
        onValueChange={(itemValue, itemIndex) => setSelectedPlan(itemValue)}
      >
        <Picker.Item label=" all_Inclusive" value=" all_Inclusive" />
        <Picker.Item label="breakFast" value="breakFast" />
        <Picker.Item label="halfBoard" value="halfBoard" />

      </Picker>
    </View>
    </View>
    <Text style={{height:1,backgroundColor:'#6082B6',marginTop:15,margin:10}}>h</Text>
    <View>
    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between',margin:18 }}>
        <View>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Adults</Text>
        <Text>Age 13 Or Above</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%' }}>
         <IconButton icon="minus-circle-outline" size={30} onPress={minus} />
         <Text style={{fontSize:17}}>{people}</Text>
        <IconButton icon="plus-circle-outline" size={30} color="red" style={{color:'red'}} onPress={plus} />
       </View>
    </View>

    <Text style={{height:1,backgroundColor:'#6082B6',marginTop:5,margin:10}}>h</Text>

    <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-between',margin:18 }}>
        <View>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Room</Text>
        <Icon name='bedroom-parent' size={30} style={{color:'#DCE2FC'}}/>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%' }}>
         <IconButton icon="minus-circle-outline" size={30} onPress={remove} />
         <Text style={{fontSize:17}}>{numRoom}</Text>
        <IconButton icon="plus-circle-outline" size={30} color="red" style={{color:'red'}} onPress={add} />
       </View>
    </View>

    </View>

    </View>
    <Button style={{backgroundColor:'#7CB9E8',width:'50%',marginLeft:99,marginTop:20   }} textColor='black' onPress={()=>{handleGet(body),navigation.navigate('Calander',{hotelId:hotelId,view:selectedValue,plan:selectedPlan,numRoom:numRoom,people:people})}} >Search</Button>
  <Text style={{marginTop:30,width:0,height:0}}>hhh</Text>
    </View>
    </ScrollView>
  )
}
