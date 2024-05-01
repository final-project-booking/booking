
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet,Image  ,TextInput,TouchableOpacity,SafeAreaView,ImageBackground ,Modal} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {getCityByLocation} from '../../reduce/SearchHotel'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import HotelsByLocation from './HotelsByLocation';
export default function Home() {

  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState([]);
  const dispatch=useDispatch()
  const [selectedDate, setSelectedDate] = useState(null);
 

const handleSubmitForm =(selectedCity)=>{
dispatch(getCityByLocation(selectedCity))

console.log('okkkkkkkkk',selectedCity);
}
    

    return (

      <ImageBackground source={{uri:'https://i.pinimg.com/originals/00/9e/59/009e59b9df936efc79f2089d55181766.jpg'}} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Hotels Tunisie</Text>
          </View>
          <View style={{ borderRadius: 50 , width: '60%',
      height: 10,
      marginBottom: 50,
      backgroundColor: '#fff', }}>
  <Picker
    selectedValue={selectedCity}
    onValueChange={(itemValue) => setSelectedCity(itemValue)}
    style={{  
    
      marginBottom: 20,
      backgroundColor: '#fff', 
      opacity:0.8,
      color:'black'
    }}
  >
    <Picker.Item label="Sousse" value="sousse" />
    <Picker.Item label="Hammamet" value="hammamet" />
    <Picker.Item label="Jerba" value="jerba" />
    <Picker.Item label="Mahdia" value="mahdia" />
    <Picker.Item label="Bizerte" value="bizerte" />
  </Picker>
</View>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setCalendarVisible(!isCalendarVisible)}
          >
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2  , borderColor: '#FFFFFF',backgroundColor:'#FFFFFF',borderRadius:10 }}>
          <TextInput placeholder='Date' style={{width:'60%'}} value={selectedDate}/>
            <Icon
          name='calendar'
          size={20}
          // color='#887700'
           /> 
          </View>
          </TouchableOpacity>
          {isCalendarVisible && (
  <Modal transparent={true} animationType="slide">
    <View style={styles.modalBackground}>
    <TouchableOpacity style={styles.closeButton} onPress={() => setCalendarVisible(false)}>
      <Text style={styles.closeButtonText}>X</Text>
    </TouchableOpacity>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
        }}
        onDayPress={(day) => {
    const formattedDate = moment(day.dateString).format('MMMM Do YYYY');
    setSelectedDate(formattedDate);
    setCalendarVisible(false);
  }}
      />
    </View>
  </Modal>
)}
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText} onPress={()=> handleSubmitForm(selectedCity)}>Search</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.footer}>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Profile</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {/* <HotelsByLocation hotels={selectedCity}/> */}
    </ImageBackground>
  );
  } // Add this closing curly brace

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  centerContainer: {
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center', // Center the calendar vertically
    alignItems: 'center', // Center the calendar horizontally
  },
  closeButton: {
    position: 'absolute', // Position the close button absolutely...
    top: 20, // ...20 pixels from the top...
    right: 20, // ...and 20 pixels from the right
  },
  closeButtonText: {
    fontSize: 24, // Make the 'X' text larger
    fontWeight: 'bold', // Make the 'X' text bold
    
  },
  picker: {
    
    width: '55%',
    height: 10,
    marginBottom: 20,
    // borderRadius: 50,

    backgroundColor: '#fff',

  },
  calendarButton: {
    // backgroundColor: '#00adf5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    opacity:0.8,

  },
  calendarButtonText: {
    color: '#ffffff',
    // fontWeight: 'bold',
    fontSize: 30,
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  calendarTheme: {
    
    borderRadius: 50,
   width: '60%',
    height: 10,
    marginBottom: 20,
    backgroundColor: '#00adf5',
  },
  searchButton: {
     
    backgroundColor: '#00adf5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 50,
    width:'60%',
    alignItems: 'center',

  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingBottom: 40,
    backgroundColor: '#F0FFFF',
    alignItems: 'center',
    width:'100%',
    height: 50,
    opacity:0.5
  },
  link: {
    flex: 1,
      alignItems: 'center',
  },
  linkText: {
    color:  '#00b5ec',
    fontWeight: 'bold',
    // top:5
  },
 
});