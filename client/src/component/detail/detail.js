import React,{useState,useEffect,useRef} from 'react'
import { View, Text, StyleSheet, Linking ,ScrollView,Image,Dimensions, Button,TouchableOpacity} from 'react-native';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome5';


export default function detail() {

    const [dimension, setDimension] = useState(Dimensions.get('window'));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollRef = useRef();
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
          { url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/dbeb3be8-2a3f-48b0-86fb-168010585fe7-Atlantis_Palm_underwatersuite.jpg' },
          { url: 'https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg' },
        { url: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?cs=srgb&dl=pexels-julieaagaard-2467285.jpg&fm=jpg' },
        { url: 'https://housing.com/news/wp-content/uploads/2022/11/hotel-room-design-compressed-1.jpg'},
        { url: 'https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/294/146/75/vision-dam/digital/parks-platform/parks-global-assets/disneyland/resorts/disneyland-hotel/rooms/room-b4-g00-16x9.jpg?2022-11-04T17:36:51+00:00' },
      ];

      const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
};
    return (
   
        <View style={styles.container}>
        <View style={styles.carouselContainer}>
            <View style={styles.icon}>
          <Icon name='arrow-back' size={30} style={{zIndex:1 ,paddingTop:5, }} />
          </View>
          <ScrollView
            horizontal
            ref={scrollRef}
            onMomentumScrollEnd={setIndex}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          >
          <View style={ styles.coverImageContainer }>
            {carouselImages.map((value, key) => (
              <Image
                key={key}
                source={{ uri: value.url }}
                style={[styles.carouselImage, { width: dimension?.width }]}
                PlaceholderContent={<ActivityIndicator />}
              />
            ))}
          </View>
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
        
        {/* Hotel Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.hotelName}>The Carlton Hotel</Text>
          <Text style={styles.detailsText}>2 bedrooms, 2 bathrooms</Text>
          <Text style={styles.detailsText}>Phone: +1 212-532-4100</Text>
          <Text style={styles.rating}>
            <Icon name='star' size={20} style={{ color: 'yellow' }} /> 4.5 (200 reviews)
          </Text>
          {/* Amenities */}
          <View style={{justifyContent:'space-between',marginTop:30}}>
          <View style={{backgroundColor:'#E6E6FA',height:1,width:'100%'}}>
            <Text>Location</Text>
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
          <View style={styles.buttonContainer}>
            <Button title='Continue' />
          </View>
        </View>
      </View>
          
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
      alignSelf: 'flex-end'
    },
  });
  