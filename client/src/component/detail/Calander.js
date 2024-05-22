import React, { useEffect, useState } from 'react';
import { View ,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import { eachDayOfInterval, format } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { ComparPrice } from '../../reduce/comparPrice';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  } from 'react-native-gesture-handler';

export default function Reservation({route,navigation}) {
  // const [selectedDates, setSelectedDates] = useState({});
  const [hotelId,setHotelId]=useState(route.params.hotelId)
  const [selectedValue, setSelectedValue] = useState(route.params.view);
  const [selectedPlan, setSelectedPlan] = useState(route.params.plan);
  const [date, setDate] = useState({});
  const [numRoom, setNumRoom] = useState(route.params.numRoom);
  const [price, setPrice] = useState();
  const [selectedDates, setSelectedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
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
// console.log('date',date);
console.log('calendar',route.params.ownerId);
const handleGet=()=>{
    dispatch(ComparPrice(body))
}

console.log('hotelId',hotelId);


const onDayPress = (day) => {
  const { dateString } = day;
  const newSelectedDates = [...selectedDates]; // Create a copy
  console.log('hello',day);

    if (startDate) {
      const [start, end] = [startDate, dateString].sort();
      for (let i = new Date(start); i <= new Date(end); i.setDate(i.getDate() + 1)) {
        const dateObj = new Date(i);
        const formattedDate = dateObj.toISOString().slice(0, 10);
        if (!newSelectedDates.includes(formattedDate)) {
          newSelectedDates.push(formattedDate);
        }
      }
    } else {
      setStartDate(dateString);
    }
    setSelectedDates(newSelectedDates);
    console.log("alll dates ",selectedDates)
  };

  const markedDates = selectedDates.reduce((acc, date) => {
    acc[date] = { marked: true };
    return acc;
  }, {});
  function getDatesBetween(startDate, endDate) {
    // Parse the dates
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
  
    // Ensure at least one valid date is provided
    if (!start && !end) {
      throw new Error("At least one date must be provided");
    }
  
    // Ensure valid dates
    if ((start && isNaN(start)) || (end && isNaN(end))) {
      throw new Error("Invalid date format");
    }
  
    // If only one date is provided, return an array with that date
    if (!start) return [end];
    if (!end) return [start];
  
    // Ensure start date is before end date
    if (start > end) {
      throw new Error("Start date must be before end date");
    }
  
    // Array to hold the dates
    const dates = [];
  
    // Loop from start date to end date
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date)); // Push a new Date object to avoid reference issues
    }
  
    return dates;
  }
  
 
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name='arrow-back' size={25} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerText}>Choose Your Arrival & Departure</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={markedDates}
          markingType={'custom'}
          minDate={today}
          theme={{
            backgroundColor: '#F4F7FD',
            calendarBackground: '#F4F7FD',
            textSectionTitleColor: 'black',
            dayTextColor: 'black',
            todayTextColor: '#00adf5',
          }}
        />
      </View>
      <View style={styles.dateInfoContainer}>
        <Text style={styles.dateInfoText}>Start: {selectedDates[0]}</Text>
        <Text style={styles.dateInfoText}>End: {selectedDates[selectedDates.length - 1]}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" color='black' style={styles.resetButton} onPress={() => navigation.navigate('AllHotell')}>
          Reset
        </Button>
        <Button mode="contained" style={styles.continueButton} onPress={() =>
          {handleGet(), navigation.navigate('Detail', {selectedDates:selectedDates, hotelId:hotelId, numRoom:numRoom, people:people, ownerId:route.params.ownerId, hotelName:route.params.hotelName})}
        }>
          Continue
        </Button>
      </View>
    </View>
  </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F7FD',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingBottom: 10,
//   },
//   backButton: {
//     backgroundColor: '#007BFF',
//     borderRadius: 30,
//     padding: 10,
//     marginRight: 10,
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: 'black',
//   },
//   calendarContainer: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     elevation: 5,
//     marginHorizontal: 10,
//     marginBottom: 20,
//     overflow: 'hidden',
//     marginTop:80
//   },
//   calendar: {
//     width: '100%',
//     marginTop: 20,
//     height: 350,
//   },
//   dateInfoContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//     marginTop:30,
//     borderWidth:1,
//     borderRadius:10,
//    width:'50%',
//    marginLeft:70
//   },
//   dateInfoText: {
//     fontSize: 16,
//     color: 'black',
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//     marginTop: 70,
//   },
//   resetButton: {
//     flex: 1,
//     marginRight: 10,
//     borderColor: 'black',
//     borderWidth: 1,
//   },
//   continueButton: {
//     flex: 1,
//     backgroundColor: '#007BFF',
//   },
// });
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5', // Light gray background for better contrast
    paddingVertical: 30,
  },
  container: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#00adf5',
    borderRadius: 50,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  calendar: {
    width: '100%',
    borderRadius: 10,
  },
  dateInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dateInfoText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  resetButton: {
    flex: 1,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#00adf5',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
});









