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
const people=route.params.people
  const dispatch = useDispatch();
const prices=useSelector(state=>state.getRoomByCategory.room)
console.log('price',prices?.price);
console.log(prices);
const body={
  view:selectedValue,
  hotelId:hotelId,
  plan:selectedPlan,
  numRoom:numRoom,
  price:prices?.price
}
console.log('calendar',route.params.ownerId);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <Icon name='arrow-back' size={25} color='black' />
        </View>
        <Text style={styles.headerText}>Choose Your Arrival & Departure</Text>
      </View>
      <Calendar
        style={styles.calendar}
        onDayPress={(day) => handleDateChange(day.dateString)}
        markedDates={getMarkedDates()}
        markingType={'custom'}
        minDate={today}
        theme={{
          backgroundColor: '#DCE2FC',
          calendarBackground: '#DCE2FC',
          textSectionTitleColor: 'black',
          dayTextColor: 'black',
          todayTextColor: '#00adf5',
        }}
      />
      <View style={styles.dateInfoContainer}>
       
        <Text style={styles.dateInfoText}>Start: {selectedDates.start}</Text>
        <Text style={styles.dateInfoText}>End: {selectedDates.end}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" fontWeight='bold' color='black' style={styles.resetButton} onPress={() => { }}>
          Reset
        </Button>
        <Button mode="contained" style={styles.continueButton} 
        onPress={() =>
          {handleGet(), navigation.navigate('Detail', {selectedDates:selectedDates,hotelId:hotelId,numRoom:numRoom,people:people,ownerId:route.params.ownerId})}
         }>
          Continue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE2FC',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: {
    backgroundColor: '#89CFF0',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  calendar: {
    width: '100%',
    marginBottom: 20,
    marginTop:100
  },
  dateInfoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dateInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  dateInfoText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop:110
  },
  resetButton: {
    flex: 1,
    marginRight: 10,
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#0000FF',
  },
})