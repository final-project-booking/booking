import React, { useEffect, useState } from 'react';
import { View ,Text} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { eachDayOfInterval, format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
export default function MyComponent() {
  const [selectedDates, setSelectedDates] = useState({});

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
  const chek=()=>{
    if(selectedDates===null) {
        return 
    }else{
    return selectedDates
    }
  }
  useEffect(() => {
chek()
  },[])

  return (
    <View>
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
      />
    </View>
    <View><Text >${chek}</Text></View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '40%',margin:20 }}>
    <Button  mode="contained" style={{width:'30%',backgroundColor:'#0000FF'}}>
    Reset
  </Button>
  <Button  mode="contained" style={{width:'30%',backgroundColor:'#0000FF'}}>
   Save
  </Button>
    </View>
  
    </View>
  );
}