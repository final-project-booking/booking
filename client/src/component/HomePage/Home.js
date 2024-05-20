import React, { useState,useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/Colors';
import { AllHotell } from '../../reduce/Hotels';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeScreen = ({ navigation }) => {


  const dispatch=useDispatch()
  const hotel = useSelector(state => state.hotelSlice.hotels);
  const loading = useSelector(state => state.allHotels.loading);
  const error = useSelector(state => state.allHotels.error);

  useEffect(()=>{
    dispatch(AllHotell())
  

    },[dispatch])
;

console.log(hotel,"hotelss")

  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;


React.useEffect(() => {
  Animated.timing(scrollX, {
    toValue: 100, 
   duration: 10,
    useNativeDriver: true, 
  }).start();
}, []);

const handleNav=()=>{
  navigation.navigate('TabNavigator')
}
handleNav()
const scale = scrollX.interpolate({
  inputRange: [0, 100],
  outputRange: [1, 1],
  extrapolate: 'clamp',
});
const HandleShowAll = ()=>{
  navigation.navigate('AllHotels')
}
const opacity = scrollX.interpolate({
  inputRange: [0, 100],
  outputRange: [1, 0], 
  extrapolate: 'clamp',
});

  const CategoryList = ({ navigation }) => {
    return (
      <View style={styles.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...styles.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? "#112678"
                      :   '#161618',
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: "#112678",
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };



  const TopHotelCard = ({ hotel }) => {
    return (
      <View style={styles.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 15 }}>
            5.0
          </Text>
        </View>
        <Image style={styles.topHotelCardImage} source={{uri:hotel.imgUrl}} />
         <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color  :   '#161618' }}>{hotel.name}</Text>
          {/* <Text style={{ fontSize: 7, fontWeight: 'bold',  color: '#161618'}}>
            {hotel.name}
          </Text>  */}
        </View>
      </View>
    );
  };

  const Card = ({hotel}) => {
    return (
          <TouchableOpacity
        // disabled={activeCardIndex != index}
        // activeOpacity={1}
        onPress={() => navigation.navigate('HotelProfile',{hotel:hotel})}>
      <View style={styles.card}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 15 }}>
            5.0
          </Text>
        </View>
        <Image style={styles.cardImage} source={{uri:hotel.imgUrl}} />
        <View style={styles.cardDetails}>
           <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17 ,color  :   '#161618'}}>
                  {hotel.name}
                </Text>
                {/* <Text style={{ color: '#161618', fontSize: 12 }}>
                  {hotel.description}
                </Text> */}
              </View>
              <Icon name="bookmark-border" size={26} color='#161678'/>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{ fontSize: 10,  color: '#161618' }}>365reviews</Text>
            </View>
          </View>
      </View>
      </TouchableOpacity>
    );
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / cardWidth);
    setActiveCardIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' , color: '#161618'}}>Find your hotel</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#161618' }}>in </Text>
            <Text
              style={{ fontSize: 30, fontWeight: 'bold', color:"#112678" }}>
              Tunisia
            </Text>
          </View>
        </View>
        <Image source={require('../../Photo/logo-color.png')} style={{width:190,height:80,opacity:1}}/> 

      
        {/* <Icon name="person-outline" size={38}  color='#161618'/> */}

      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={30} style={{ marginLeft: 20 , color: '#161618' }} />  
          <TextInput
            placeholder="Search"
            style={{ fontSize: 20, paddingLeft: 10 ,  color: '#161618'}}
          />
        </View>
        <CategoryList />
        <View>
          
        <FlatList
          data={hotel}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => <Card hotel={item}  />}
        />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{ fontWeight: 'bold',  color: '#161618'}}>
            Top hotels
          </Text>
          <TouchableOpacity style={{  color: '#161618' }}>
            <Text
            style={{color: '#161618'} } onPress={HandleShowAll}>
               Show all
            </Text>
            </TouchableOpacity>
        </View>
        <FlatList
          data={hotel}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => <TopHotelCard hotel={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
   
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 300,
    width: 350,
    elevation: 15,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 250,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 80,
    borderRadius: 15,
    backgroundColor: "#E7E9F2",
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
  },
  cardOverlay: {
    height: 280,
    backgroundColor: "#E7E9F2",
    position: 'absolute',
    zIndex: 100,
    width: 500,
    // borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: "#E7E9F2",
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default HomeScreen;
