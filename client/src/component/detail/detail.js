import React,{useState,useEffect,useRef} from 'react'
import { View, Text, StyleSheet, Linking ,ScrollView,Image,Dimensions,TouchableOpacity} from 'react-native';
import { ActivityIndicator,Modal,Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Detail({route,navigation}) {
    
    const [dimension, setDimension] = useState(Dimensions.get('window'));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const scrollRef = useRef();
    const compar=useSelector(state=>state.comparPrice.compar)||[]
    console.log('compar',compar);
    const onChange = ({ window }) => {
      setDimension(window);
    };
    // console.log('root',route.params.numRoom);


    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if(token !== null) {
          return true;
        } else {
          return false;
        }
      } catch(e) {
        console.log(e);
        return false;
      }}
   

// console.log(tokenGeted());
const check = async () => {
  if(await checkToken()){
    navigation.navigate('AllHotels')
  }else{
    setModalVisible(!modalVisible)
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
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.carouselContainer}>
            <View style={styles.icon}>
          <Icon name='arrow-back' size={30} style={{zIndex:1 ,paddingTop:5,backgroundColor:'white',borderRadius:55,marginLeft:7 ,opacity:.6}} onPress={()=>navigation.navigate('AllHotels')}/>
          </View>
          <ScrollView
            horizontal
            ref={scrollRef}
            onMomentumScrollEnd={setIndex}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          >
          {/* <View style={ styles.coverImageContainer }> */}
            {carouselImages.map((value, key) => (
              <Image
                key={key}
                source={{ uri: value.url }}
                style={[styles.carouselImage, { width: dimension?.width }]}
                PlaceholderContent={<ActivityIndicator />}
              />
            ))}
          {/* </View> */}
          </ScrollView>
         
          <View style={styles.pagination}>
            {carouselImages.map((val, key) => (
              <Text
                key={key}
                style={[styles.paginationDot, key === selectedIndex ? styles.selectedDot : styles.normalDot]}
              >
                ⬤
              </Text>
            ))}
          </View>
        </View>
        
        <View style={styles.detailsContainer}>       

       <View>
          <Text style={styles.hotelName}>The Carlton Hotel</Text>
          <Text style={styles.detailsText}>HotelName:</Text>
          <Text style={styles.detailsText}>2 bedrooms, 2 bathrooms</Text>
          <Text style={styles.detailsText}>Phone: +1 212-532-4100</Text>
           
          
         <View style={{flexDirection:'row'}}>
        <Icon size={20} name='star'style={{marginBottom:19}} color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        <Icon size={20} name='star' color={'#f5a623'}/>
        </View>
         
          
          </View>
          <View style={{padding:10}}>
<Text style={{height:1,width:'100%', backgroundColor:'#DCE2FC',marginTop:18}}>h</Text>
</View>
<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',justifyContent:'space-between' }}>
{compar?.mainRooms ? compar.mainRooms.map((e)=>{

 return <TouchableOpacity style={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} onPress={check}>
    <View style={{ marginTop: 20, marginRight: 20 }}>
      <Image source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill' }} style={{ width: 150, height: 150, borderRadius: 10 }} />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 12, color: 'black' }}>{e?.view}</Text>
        <Text style={{ marginLeft: 1, marginBottom: 15, color: 'black' }}>People:{e?.capacity}</Text>
        <Text style={{ color: 'black' }}>Price:${e?.price}</Text>
        {/* <Text style={{ color: 'black' }}>Rooms:{route.params.numRoom}</Text> */}
      </View>
    </View>
  </TouchableOpacity>
}):null}
{compar?.mainRooms ? compar.relatedRooms.map((e)=>{

return  <TouchableOpacity style={{ shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
    <View style={{ marginTop: 20 }}>
      <Image source={{ uri: 'https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp' }} style={{ width: 150, height: 150, borderRadius: 10 }} />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 12, color: 'black' }}>{e?.view}</Text>
        <Text style={{ marginLeft: 1, marginBottom: 15, color: 'black' }}>People:{e?.capacity}</Text>
        <Text style={{ color: 'black' }}>Price:${e?.price}</Text>
        {/* <Text style={{ color: 'black' }}>Rooms:{route.params.numRoom}</Text> */}

      </View>
    </View>
  </TouchableOpacity>
}):null}
</View>
       




          <View style={{justifyContent:'space-between',marginTop:30}}>
          <View style={{backgroundColor:'#E6E6FA',height:1,width:'100%'}}>
          </View>
          <View >
          <Text style={{ fontSize: 30,textAlign: 'center',margin: 5,color: '#333333',}}>What We Offer</Text>
          </View>
          </View>
          <View style={styles.amenitiesContainer}>
          <View>
            <Text style={styles.amenitiesText}><Icon name='lunch-dining' size={20} /> Breakfast</Text>
            <Text style={styles.amenitiesText}><Icon name='tv' size={20} /> TV</Text>
            <Text style={styles.amenitiesText}><Icon name='air' size={20} /> Air Conditioner</Text>
            </View>
            <View>
            <Text style={styles.amenitiesText}><Icon name='water' size={20} /> Swimming Pool</Text>
            <Text style={styles.amenitiesText}><Icon name='coffee-maker' size={20} /> Coffee maker</Text>
            <Text style={styles.amenitiesText}><Icon name='signal-wifi-4-bar' size={20} /> Free Wifi</Text>
            </View>
          </View>
          {/* Continue Button */}
          <View style={styles.buttonContainer} >
          <Button  mode="contained" style={{backgroundColor:'#0000FF',top:-20}}  >
          Reservation
         </Button>
          </View>
        </View>
      </View>
      <View style={styles.centeredView}>
      <Modal
      style={{height:40,width:40}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={{marginTop:-10,marginRight:280}}
              onPress={() => setModalVisible(!modalVisible)}>
        <Icon name='keyboard-backspace' size={30} onPress={() => setModalVisible(!modalVisible)}/>
        </Pressable>
          <Text style={styles.modalText}>If you  have an Account? </Text>
            <TouchableOpacity    style={{backgroundColor:'#DCE2FC',width:80,height:40,borderRadius:40,marginTop:15}}>
            <Text style={{color:'black',textAlign:'center',marginTop:9}}  onPress={()=>navigation.navigate('Login')}>Login</Text>

            </TouchableOpacity>
            <Text style={styles.modalText}>If you don't have an Account? </Text>
            <TouchableOpacity    style={{backgroundColor:'#DCE2FC',width:80,height:40,borderRadius:40,marginTop:15}}>
              <Text style={{color:'black',textAlign:'center',marginTop:9}} onPress={()=>navigation.navigate('SignUp')}>Sign Up</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </Modal>
     
    </View>
      </ScrollView>
      
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    carouselContainer: {
      width: '100%',
      height: 200,
      marginBottom: 20,
    
      position: 'relative',
      

    },
    icon: {
        position: 'absolute',
        zIndex: 1,
        top: 5,
        left: 5,
        
        color:'black'
      },
    carouselImage: {
      height: '100%',
      resizeMode: 'cover',
    
   
    },
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    },
    paginationDot: {
      marginHorizontal: 5,
      fontSize: 18,
    },
    selectedDot: {
      color: 'white',
    },
    normalDot: {
      color: '#888',
    },
    detailsContainer: {
      paddingHorizontal: 20,
    },
    hotelName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    detailsText: {
      fontSize: 16,
      marginBottom: 5,
    },
    rating: {
      fontSize: 16,
      marginBottom: 10,
      color: '#888',
      flexDirection:'row',
     justifyContent:'space-around'
    },
    amenitiesContainer: {
      marginTop: 30,
    //   alignSelf: 'flex-end',
      justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        

    },
    amenitiesText: {
      fontSize: 16,
      marginTop: 5,
    },
    buttonContainer: {
      marginTop: 60,
      width: '45%',
    //   flexDirection: 'row',
    //   bottom: 10,
      alignSelf: 'flex-end',
      // backgroundColor:'#DCE2FC',
      
      color:'#0000FF'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      
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
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      fontSize:50,
      borderRadius: 20,
      padding: 10,
      elevation: 0,
      width:140,
      height:70,
    },
    buttonOpen: {
      backgroundColor: 'white',
    },
    buttonClose: {
      backgroundColor: 'white',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize:20,
      marginTop:15
    },
  });