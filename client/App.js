import React, { useEffect ,useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Linking ,ScrollView,Image,Dimensions,TouchableOpacity,TextInput,Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Nav from './screens/Nav';
import socket from './socket';
import { Modal,Pressable } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App({route,navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});
  // const [visible, setVisible] = React.useState(false);
  const [msg,setMsg]=useState('')
  useEffect(()=>{
    
    socket.on('connection', () => {
      console.log('Connected to server');
    });

    socket.on('Received_request', (data) => {
      console.log('ceived_request'  , data);
      setData(data);
      
      setModalVisible(!modalVisible);
    });

    return () => {
      socket.disconnect();
    };
  },[])

console.log('data request',data);
  const showDialog=()=>{
    return (
      <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
            <Icon name='keyboard-backspace' size={30} />
          </Pressable>
          <Text style={styles.modalText}>Message: {data?.body?.content}</Text>
          <TouchableOpacity
            style={styles.modalButton}
           
          >
            <Text style={styles.modalButtonText}>Price: {data?.body?.newPrice}</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>Room N°: {data?.body?.roomId}</Text>
          <Text style={styles.modalText}>From: {data?.user?.firstName} {data?.user?.lastName}</Text>
          <Text style={styles.modalText}>Hotel:{data?.body?.hotelName} </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.actionButton} onPress={() =>Cancel()}>
              <Text style={styles.actionButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={() => Accept()}>
              <Text style={styles.actionButtonText}>Accept</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>

    )
  }

  // const showResponse=()=>{
  //   return (
  //     <Modal
  //     animationType='slide'
  //     transparent={true}
  //     visible={visible}
  //     onRequestClose={() => setVisible(!visible)}
  //   >
  //     <View style={styles.centeredView}>
  //       <View style={styles.modalView}>
  //         <Text style={styles.modalText}>{data.status}</Text>
  //         <TouchableOpacity
  //           style={styles.modalButton}
            
  //         >
  //           <Text style={styles.modalButtonText}>Price: {data?.body?.newPrice}</Text>
  //         </TouchableOpacity>
  //         <Text style={styles.modalText}>Room N°: {data?.body?.roomId}</Text>
  //         <Text style={styles.modalText}> {data?.user?.firstName} {data?.user?.lastName}</Text>
  //         <View style={styles.buttonContainer}>
  //           <Pressable style={styles.actionButton} onPress={() =>navigation.navigate('Payment',{roomId:data.body.roomId,userId:data.body.userId,dates:data.body.dates})}>
  //             <Text style={styles.actionButtonText}>Okey</Text>
  //           </Pressable>
  //         </View>
  //       </View>
  //     </View>
  //   </Modal>

  //   )
  // }
 const Accept=()=>{
  setMsg('Your offer is accepted')
  socket.emit('accepte_reject', { user: data.user, body: data.body, status: 'Your offer is accepted' });
  setModalVisible(false);
 }
 const Cancel=()=>{
  setMsg('Your offer is accepted')
  socket.emit('accepte_reject', { user: data.user, body: data.body, status: 'Your offer is not accepted' });
  setModalVisible(false);
 }

  return (


    <GestureHandlerRootView> 
    {showDialog()}
   
      <Nav/>
    </GestureHandlerRootView>
    
  )}
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background for focus
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginBottom: 15,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 16,
      color: '#333',
      marginTop:10
    },
    modalButton: {
      // backgroundColor: '#2196F3',
      borderRadius: 15,
      padding: 10,
        // elevation: 2,
        // marginVertical: 10,
      width: '50%',
      alignItems: 'center',
      borderColor:'black',
      borderWidth:1
      
    },
    modalButtonText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    actionButton: {
      backgroundColor: '#2196F3',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width: '45%',
      alignItems: 'center',
    },
    actionButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  
  
  
export default App;
