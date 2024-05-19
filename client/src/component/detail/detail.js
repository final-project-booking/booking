import React,{useState,useEffect,useRef,createContext} from 'react'
import { View, Text, StyleSheet, Linking ,ScrollView,Image,Dimensions,TouchableOpacity,TextInput,Animated } from 'react-native';
import { ActivityIndicator,Modal,Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button,IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { negotiation } from '../../reduce/negotiation';
import {AP_ADRESS} from '../../apAdress'
import io from 'socket.io-client';
const socket = io(`http://${AP_ADRESS}:4000`); 

const { width } = Dimensions.get('window');


export default function Detail({route,navigation}) {
// console.log('owner',route?.params.ownerId);  
    const [dimension, setDimension] = useState(Dimensions.get('window'));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPrice, setNewPrice] = useState(false);
    const [newPrice2, setNewPrice2] = useState(false);
    const [price2, setPrice2] = useState();
    const [prix,setPrix]=useState()
    const [input,setInput]=useState('')
    const [id,setId]=useState()
    const [socketN, setSocketN] = useState(null);
    const dispatch=useDispatch()

    const scrollRef = useRef();
    const compar=useSelector(state=>state.comparPrice.compar)||[]
    const user=useSelector(state=>state.userSignIn.userAuth)
    console.log('user',user);
    console.log('compar',compar);
    const onChange = ({ window }) => {
      setDimension(window);
    };
    const body={
      roomId:id,
      newPrice:price2,
      content:input,
      userId:user?.user?.id,
      ownerId:route?.params.ownerId
    }
    console.log(body);
    useEffect(() => {
      if (body) {
      socket.on('connection', () => {
        console.log('Connected to server');
      }); 
      socket.emit('join',1);
    if (!socket) console.log("not connected to sockete");
    
    
    socket.on('send_request', (body) => {
      console.log('data is ready',body);
     
    });
   
      
        socket.emit('send_request', body);
        console.log('somthing happen',body);
      }
    
    return () => socket.off('send_request');
    }, [body]);



  console.log('price',price2);
    const userr=async()=>{
      try {
        
      const users=  await AsyncStorage.getItem('user');
   console.log('users',users);
        console.log("Token user successfully");
      } catch (err) {
        console.log("Error storing token:", err);
      }
    }
  //   const removetoken=async()=>{
  //     try {
        
  //     const token=  await AsyncStorage.removeItem('token');
  //  console.log('users',token);
  //       console.log("Token ²remove successfully");
  //     } catch (err) {
  //       console.log("Error storing token:", err);
  //     }
  //   }
    // removetoken()
    userr()
    const sendNego=(r)=>{
      dispatch(negotiation(r))
      console.log('hello');
    }
   
    const negos=async ()=>{
      if(await checkToken()){
        setPrice2(compar?.mainRooms[0].price)
        setId(compar?.mainRooms[0].id)
        setNewPrice2(!newPrice2)
      }else{
        setModalVisible(!modalVisible)

      }
    }
    const plus = () => {
      if (price2>=0){

        setPrice2(price2 + 50);
      }
    };
  
    const minus = () => {
      if (price2>0) {
        setPrice2(price2 - 50);
      }
    };
    const pluss = () => {
      if (prix>=0){

        setPrix(prix + 50);
      }
    };
  
    const minuss = () => {
      if (prix>0) {
        setPrix(prix - 50);
      }
    };
const getCurrentRoomPrice=(p)=>{
  setPrix(p)
}
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if(token !== null) {
          return true;
        } else {
          return false;
        }
      } catch(e) {
        console.log(e);
        return false;
      }}
   


const check = async () => {
  if(await checkToken()){
    setModalVisible(!modalVisible)
  }else{
    navigation.navigate('Succes')
  }
}
const nego= (p)=>{
  if(checkToken()){
  
    setNewPrice(!newPrice)
    setPrix(p)
    console.log('ppp',p);
  }else{
    setNewPrice(!newPrice)
    setPrix(p)
    console.log(p);
  }
}


    useEffect(() => {
     const subscription= Dimensions.addEventListener('change', onChange)
      return () => {
        subscription.remove();
      };
    }, []);
    const x=2
    const y=2
    useEffect(() => {
        const interval = setInterval(() => {
          setSelectedIndex(prevSelectedIndex =>
            prevSelectedIndex === carouselImages.length - 1 ? 0 : prevSelectedIndex + 1
          );
          scrollRef.current.scrollTo({
            animated: true,
            y: 0,
            x: dimension.width * selectedIndex,
          });
        }, 3000);
        return () => clearInterval(interval);
      }, [dimension.width, selectedIndex]);

      const carouselImages = [
          { url: 'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg' },
          { url: 'https://hips.hearstapps.com/hmg-prod/images/grand-hotel-tremezzo-6479210d9dae0.jpeg' },
        { url: 'https://media.istockphoto.com/id/1084656062/photo/interior-of-a-hotel-bathroom.jpg?s=612x612&w=0&k=20&c=rZxxHZ_QxV4SZtNwi1izI1jKLckdS9Uz0LZc_M41_OE=' },
        { url: 'https://www.santoriniview-hotel.gr/media/idijrdoe/santorini-view-hotel-junior-suite-panoramic-caldera-view-10.jpg?rxy=0.612,0.551051051051051&width=800&height=550&rnd=133330453672900000&quality=70' },
        { url: 'https://hamiltonisland.imgix.net/hamiltonisland/media/originals/accommodation/reef-view-hotel/rvh-pool-(1).jpg?width=480&height=600&fit=crop&d=20221101093418'},
      ];

      const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
};
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.carouselContainer}>
          <Icon
            name='arrow-back'
            size={30}
            style={styles.backIcon}
            onPress={() => navigation.navigate('AllHotels')}
          />
          <ScrollView
            horizontal
            ref={scrollRef}
            onMomentumScrollEnd={setIndex}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          >
            {carouselImages.map((value, key) => (
              <Image
                key={key}
                source={{ uri: value.url }}
                style={[styles.carouselImage, { width: width }]}
                PlaceholderContent={<ActivityIndicator />}
              />
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {carouselImages.map((val, key) => (
              <Text
                key={key}
                style={[
                  styles.paginationDot,
                  key === selectedIndex ? styles.selectedDot : styles.normalDot,
                ]}
              >
                ⬤
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.detailsContainer}>
          {compar?.mainRooms &&
            compar.mainRooms.map((e, index) => (
              <View key={index} style={styles.roomContainer}>
                <Text style={styles.hotelName}>The Carlton Hotel</Text>
                <Text style={styles.detailsText}>Rooms:</Text>
                <Text style={styles.detailsText}>2 bedrooms, 2 bathrooms</Text>
                <Text style={styles.detailsText}>People: {e?.capacity}</Text>

                <View style={styles.starsContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Icon key={index} size={20} name='star' color={'#f5a623'} />
                  ))}
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Price</Text>
                  <Text style={styles.price}>DT {e?.price}</Text>
                </View>
              </View>
            ))}

          {/* Other content */}
        </View>

        <Modal
      style={{height:40,width:40}}
        animationType="slide"
        transparent={true}
        visible={newPrice2}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setNewPrice2(!newPrice2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={{marginTop:-10,marginRight:280}}
              onPress={() => setNewPrice2(!newPrice2)}>
        <Icon name='keyboard-backspace' size={30} onPress={() => setNewPrice2(!newPrice2)}/>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%' }}>
         <IconButton icon="minus-circle-outline" size={30} onPress={minus} />
         <Text style={{fontSize:17}}>{price2}</Text>
        <IconButton icon="plus-circle-outline" size={30} color="red" style={{color:'red'}} onPress={plus} />
       </View>
       <View>
        <TextInput
        style={{borderRadius:15,width:250,fontSize:15,paddingLeft: 10,borderWidth:1,borderColor:'black',marginTop:17}}
          placeholder='Create somthing'
          onChangeText={(text) => setInput(text)}
        />
        <Button style={{marginTop:15,backgroundColor:'#DCE2FC',color:'black',fontSize:150}} onPress={()=>sendNego(body)}>Send</Button>
       </View>
          
          </View>
        </View>
      </Modal>
        {/* Negotiation and Reservation Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={negos}>
            <Text style={styles.buttonText}>Negotiation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={check}>
            <Text style={styles.buttonText}>Reservation</Text>
          </TouchableOpacity>
        </View>

        {/* Another Room Section */}
        <Text style={styles.divider}></Text>
        <Text style={styles.anotherRoomText}>Another Room</Text>
        <View style={styles.relatedRoomsContainer}>
          {compar?.relatedRooms &&
            compar.relatedRooms.map((e, index) => (
              <TouchableOpacity key={index} style={styles.relatedRoomCard}>
                <Image
                 source={{ uri: 'https://image.resabooking.com/images/hotel/Concorde_Green_Park_Palace_3.jpg' }}
                  style={styles.relatedRoomImage}
                />
                <View style={styles.relatedRoomDetails}>
                  <Text style={styles.relatedRoomTitle}>{e?.view}</Text>
                  <Text style={styles.relatedRoomInfo}>People: {e?.capacity}</Text>
                  <Text style={styles.relatedRoomInfo}>Price: DT {e?.price}</Text>
                  <Text style={styles.relatedRoomInfo}>Rooms: {e?.rooms}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Icon name='keyboard-backspace' size={30} />
            </Pressable>
            <Text style={styles.modalText}>If you have an Account?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>If you don't have an Account?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.modalButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 55,
    padding: 10,
    opacity: 0.6,
  },
  carouselImage: {
    width: width,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  paginationDot: {
    fontSize: 20,
    marginRight: 5,
    color: '#999',
  },
  selectedDot: {
    color: '#333',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  roomContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailsText: {
    marginBottom: 5,
    color: '#666',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007FFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007FFF',
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DCE2FC',
    marginBottom: 20,
  },
  anotherRoomText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  relatedRoomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  relatedRoomCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin:2
  },
  relatedRoomImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  relatedRoomDetails: {
    padding: 10,
  },
  relatedRoomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  relatedRoomInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#DCE2FC',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  });