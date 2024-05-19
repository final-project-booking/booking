import React, { useState,useEffect } from 'react'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector ,useDispatch} from 'react-redux';
import { AllHotell } from '../../reduce/AllHotels';
import { IconButton,Button } from 'react-native-paper';
const { width } = Dimensions.get('window');
 function AllHotels({navigation}) {

const dispatch=useDispatch()
useEffect(()=>{
dispatch(AllHotell())
},[])
const hotel=useSelector(state=>state.allHotels.hotel)

console.log('hotel',hotel);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Icon name='arrow-back' size={30} style={styles.backIcon} onPress={() => navigation.goBack()} />
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={30} style={styles.icon} />
          <TextInput 
            placeholder="Search" 
            style={styles.input} 
            placeholderTextColor="#888"
          />
          <Button mode="contained" style={styles.searchButton}>Search</Button>
        </View>
        {hotel.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            onPress={() => navigation.navigate('ChooseGategory', { hotelId: item.id, ownerId: item.owner.id })}
          >
            <View style={styles.cardContent}>
              <Image 
                source={{ uri: 'https://image.resabooking.com/images/hotel/Concorde_Green_Park_Palace_3.jpg' }} 
                style={styles.image} 
              />
              <View style={styles.textContainer}>
                <Text style={styles.hotelName}>{item.name}</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <Icon key={index} size={20} name='star' color={'#f5a623'} />
                  ))}
                </View>
                <Text style={styles.rooms}>Rooms: {item.rooms}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.dividerContainer}>
              <Text style={styles.divider}></Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backIcon: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-start',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
    color: '#888',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#7CB9E8',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 180,
    width: width * 0.4,
    borderRadius: 10,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  hotelName: {
    fontSize: 22,
    color: 'black',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rooms: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444',
  },
  dividerContainer: {
    padding: 10,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DCE2FC',
  },
});
export default AllHotels