import React,{useEffect,useState} from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getNegotiation } from '../../reduce/negotiation'
import { useDispatch ,useSelector} from 'react-redux'
  import io from 'socket.io-client';
  import { AP_ADRESS } from '../../apAdress'
  const socket = io(`http://${AP_ADRESS}:4000`); 

export default function Notification({navigation}) {
  const [receivedData, setReceivedData] = useState([]);

  
const dispatch=useDispatch()

const getWhereHotelId=async()=>{
    dispatch(getNegotiation())
}

useEffect(() => {
  // console.log('Attempting to connect to server...');

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('connect_error', (error) => {
    console.log('Connection error:', error);
  });
  socket.on('Received_request', (data) => {
    console.log('Received data:', data);
    
      setReceivedData(...data);
   
      console.log('Received data is undefined or null');
    
  });

  return () => {
    console.log('Disconnecting from server...');
    socket.disconnect();
  };
}, []);

console.log('Received data state:', receivedData);



// const nego=useSelector(state=>state.getNegotiations.get)
// console.log('nego',nego);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name='arrow-back' size={30} style={styles.backIcon} onPress={() => navigation.navigate('UserProfile')} />
        <Text style={styles.headerText}>Notification</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentInfo}>
          <Text style={styles.label}>Content:</Text>
          <Text style={styles.text}>Your reservation has been confirmed!</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.text}>$120</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.label}>Room N°:</Text>
          <Text style={styles.text}>101</Text>
        </View>
        <Text style={styles.dateText}>Date: 12-04-2024</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" style={styles.cancelButton} onPress={() => { }}>Cancel</Button>
        <Button mode="contained" style={styles.acceptButton} onPress={() => { }}>Accept</Button>
      </View>
    </View>
  )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F8FF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E1EBEE',
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    backIcon: {
      marginRight: 10,
      marginTop: 10,
    },
    headerText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 20,
      color: 'black',
    },
    contentContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    contentInfo: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    label: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black',
      marginRight: 5,
    },
    text: {
      fontSize: 16,
      color: 'black',
    },
    dateText: {
      marginTop: 4,
      fontSize: 16,
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    cancelButton: {
      width: '40%',
      color: 'red',
      borderColor: 'red',
      borderWidth: 1,
    },
    acceptButton: {
      width: '40%',
      backgroundColor: 'green',
    },
  });