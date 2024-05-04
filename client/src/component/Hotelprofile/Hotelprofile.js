import { StyleSheet, Text, View,ScrollView ,ActivityIndicator,Image,Dimensions} from 'react-native'
import React ,{useRef,useState,useEffect}from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Offer from './Offer'
import Reviews from './Reviews';
import Details from './Details';
 

const Hotelprofile = () => {
    
    const carouselImages = [
        { url: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg' },
        { url: 'https://www.bulgarihotels.com/.imaging/bhr-wide-small-jpg/dam/pre-home/collection_2.png/jcr%3Acontent' },
        { url: 'https://images.lifestyleasia.com/wp-content/uploads/sites/2/2021/03/08103440/best-suites-hk-grand-hyatt-3-1024x767.png'},
        { url: 'https://thumbs.dreamstime.com/b/luxury-hotel-4480742.jpg' },
        { url: 'https://c4.wallpaperflare.com/wallpaper/146/867/628/luxury-hotel-wallpaper-preview.jpg' },
      ];
      const scrollRef = useRef();
      const [dimension, setDimension] = useState(Dimensions.get('window'));
      const [selectedIndex, setSelectedIndex] = useState(0);
      const setIndex = event => {
        let viewSize = event.nativeEvent.layoutMeasurement.width;
        let contentOffset = event.nativeEvent.contentOffset.x;
        let carouselIndex = Math.floor(contentOffset / viewSize);
        setSelectedIndex(carouselIndex);
      };
      useEffect(() => {
        const onChange = ({ window }) => {
          setDimension(window);
        };
        Dimensions.addEventListener('change', onChange);
        return () => {
          Dimensions.removeEventListener('change', onChange);
        };
      }, []);
    
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

      const Tab=createBottomTabNavigator();
  return (
    <View>

    <View style={{ width: dimension.width }}>
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
          source={{ uri: `${value.url}` }}
          style={{ width: dimension?.width, height: 200, resizeMode: 'cover' }}
          PlaceholderContent={<ActivityIndicator/>}
        />
      ))}
    </ScrollView>
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
      }}
    >
      {carouselImages.map((val, key) => (
        <Text
          key={key}
          style={key === selectedIndex ? { color: 'white' } : { color: '#888' }}
        >
          ¤
        </Text>
      ))}
    </View>
  </View>
   
    <NavigationContainer>
   <Tab.Navigator>
       <Tab.Screen name="Offer" component={Offer}/>
       <Tab.Screen name="Details" component={Details}/>
       <Tab.Screen name="Reviews" component={Reviews}/>
   </Tab.Navigator>
   </NavigationContainer>

    </View>
    
);
};

const styles = StyleSheet.create({});

export default Hotelprofile