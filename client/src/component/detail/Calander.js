import React, { useEffect, useState } from 'react';
import { View ,Text,StyleSheet} from 'react-native';
import { eachDayOfInterval, format } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { ComparPrice } from '../../reduce/comparPrice';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';

export default function Reservation({route,navigation}) {
  const [selectedDates, setSelectedDates] = useState({});
  const [hotelId,setHotelId]=useState(route.params.hotelId)
  const [selectedValue, setSelectedValue] = useState(route.params.view);
  const [selectedPlan, setSelectedPlan] = useState(route.params.plan);
  // const [people, setPeople] = useState(0);
  const [numRoom, setNumRoom] = useState(route.params.numRoom);
  const [price, setPrice] = useState();

  const dispatch = useDispatch();
const prices=useSelector(state=>state.getRoomByCategory.room)
console.log('price',prices?.price);

const body={
  view:selectedValue,
  hotelId:hotelId,
  plan:selectedPlan,
  numRoom:numRoom,
  price:prices?.price
}
const handleGet=()=>{
    dispatch(ComparPrice(body))
}

  console.log('hotelId',hotelId);
  const handleDateChange = (date) => {
    setSelectedDates((prevDates) => {
      if (!prevDates.start) {
        return { start: date };
      } else if (!prevDates.end) {
        return { ...prevDates, end: date };
      } else {
        return { start: date };
      }
    });
  };
  const handleInputChange = ( value) => {
    setDate(value);
  };
  
  const getMarkedDates = () => {
    const start = new Date(selectedDates.start);
    const end = selectedDates.end ? new Date(selectedDates.end) : new Date(selectedDates.start);
    const interval = eachDayOfInterval({ start, end });
    const dates = {};
    
    interval.forEach((date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      dates[dateString] = { selected: true, selectedColor: '#007FFF' };
    });
    
    return dates;
  };
 
  const today = format(new Date(), 'yyyy-MM-dd');
  console.log(selectedDates);
  const chek=()=>{
    if(selectedDates===null) {
        return 'Date'
    }else{
    return selectedDates
    }
  }
  useEffect(() => {
chek()
  },[])

  return (
    <View style={{flex:1,backgroundColor:'#DCE2FC'}}>
    <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:20,marginLeft:20}}>
    <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>
    <View style={{ backgroundColor: '#89CFF0', borderRadius: 30,padding:'auto'}}>
  <Icon name='arrow-back' size={25} />
  </View>
  Choose Your Arrival & Departure
  </Text>
</View>
    <View style={{ marginTop:50 }}>
      <Calendar
        onDayPress={(day) => handleDateChange(day.dateString)}
        markedDates={getMarkedDates()}
        markingType={'custom'}
        minDate={today}
        theme={{
    backgroundColor: '#DCE2FC',
    calendarBackground: '#DCE2FC',
    color:'#DCE2FC',
    textSectionTitleColor: 'black',
    dayTextColor: 'black',
    todayTextColor: '#00adf5', 
  }}
 
      />
    </View>
        <View style={styles.buttonX}><Text style={styles.text}>start:{selectedDates.start}</Text><Text style={styles.text}>End:{selectedDates.end}</Text></View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 80,margin:20 }}>
    <Button mode="black" fontWeight='bold'  style={{ width: '30%', backgroundColor: '#DCE2FC', borderWidth: 1, borderColor: 'black', }}>
  Reset
</Button>
  <Button  mode="contained" style={{width:'30%',backgroundColor:'#0000FF'}}
    onPress={() =>
       {handleGet(), navigation.navigate('Detail', {selectedDates:selectedDates,hotelId:hotelId,numRoom:numRoom})}
      }
  >
   Continue
  </Button>
    </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
text:{
  color:'black',
  fontSize:15,
  textAlign:'center',
  marginLeft:10,
  fontWeight:'bold'
},
buttonX:{
  flex:1,
  justifyContent:'center'
  ,marginTop:60
  ,marginLeft:120
  ,backgroundColor:'#DCE2FC'
  ,height:70
  ,width:150,
  borderRadius:8 ,
  flexWrap: 'wrap',
  borderWidth:1,
  border:'1px solid Blue',
  // borderBottomColor:'black'
  
}
})