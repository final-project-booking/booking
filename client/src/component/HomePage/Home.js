
import React,{ useState } from 'react'
import { View, Text, StyleSheet,Image  ,TextInput,TouchableOpacity,SafeAreaView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { ListItem, SearchBar } from "react-native-elements";
export default function Home() {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('sousse');
  handleButton=()=>{
    // navigation.navvigate("UserProfile")
  }

    return (

      <View style={styles.container}>
      <View style={styles.navBar}>
       
        <Image source={require('../../Photo/bestpho.jpg')} style={styles.logo} />
      </View>
      <view>
        
      </view>
  
      <View style={styles.centerContainer}>
        <View style={styles.title}>
          <Text>Hotels Tunisie</Text>
        </View>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Sousse" value="sousse" />
          <Picker.Item label="Hammamet" value="hammamet" />
          <Picker.Item label="Jerba" value="jerba" />
          <Picker.Item label="Mahdia" value="mahdia" />
          <Picker.Item label="Bizerte" value="bizerte" />
        </Picker>
        
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setCalendarVisible(!isCalendarVisible)}
        >

          <Text style={styles.calendarButtonText}>Calendar</Text>
        </TouchableOpacity>
        {isCalendarVisible && (
          <Calendar
            style={styles.calendar} // Applied styles to calendar
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
              monthTextColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
        )}
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText} onPress={handleButton}>Profile </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
  },
  navBar: {
       height: 50,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
      width: '100%',
    height: 350,
    marginBottom: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 40,
    marginBottom: 20,
  },
  calendarButton: {
    backgroundColor: '#00adf5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  calendarButtonText: {
    color: '#ffffff',
 
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 350,
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 50,
    alignSelf: 'center'
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  link: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   // paddingHorizontal: 20,
  //   // paddingTop: 20,
  // },
  // navBar: {
  //   height: 50,
  //   backgroundColor: '#007bff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // logo: {
  //     width: '100%',
  //   height: 350,
  //   marginBottom: 10,
  // },
  // centerContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // title: {
  //   marginBottom: 20,
  // },
  // picker: {
  //     width: 200,
  //   height: 40,
  //   marginBottom: 20,
  // },
  // calendarButton: {
  //    backgroundColor: '#007bff',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 5,
  //   marginBottom: 20,
  // },
  // calendarButtonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  // },
  // searchButton: {
  //   backgroundColor: '#007bff',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 5,
  //   marginBottom: 100,
  //   alignSelf: 'center'
  // },
  // searchButtonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  // },
  // footer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   borderTopWidth: 1,
  //   borderTopColor: '#ccc',
  //   paddingVertical: 10,
  // },
  // link: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
  // linkText: {
  //   color: '#007bff',
  //   fontSize: 16,
  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  // navBar: {
  //    width: '100%',
  //   height: 50,
  //   backgroundColor: '#f2f2f2',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // logo: {
  //   width: '100%',
  //   height: 200,
  //   marginBottom: 10,
  // },
  // centerContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // picker: {
  //   width: 200,
  //   height: 40,
  //   marginBottom: 20,
  // },
  // calendarButton: {
  //   backgroundColor: '#007bff',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 5,
  //   marginBottom: 20,
  // },
  // calendarButtonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  // },
  // searchButton: {
  //   backgroundColor: '#007bff',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 5,
  //   marginBottom: 200,
  //   alignSelf: 'center', // To center the button horizontally
  // },
  // searchButtonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  // },
  // footer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   borderTopWidth: 1,
  //   borderTopColor: '#ccc',
  //   paddingVertical: 10,
  // },
  // link: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
  // linkText: {
  //   color: '#007bff',
  //   fontSize: 16,
  // },
});