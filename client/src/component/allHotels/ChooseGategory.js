import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View,Text ,ScrollView,StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { IconButton,Button } from 'react-native-paper';
import {fetchRoomByCategory} from '../../reduce/getRoomByCategory'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ComparPrice } from '../../reduce/comparPrice';

export default function ChooseGategory({ route, navigation }) {
    const [selectedValue, setSelectedValue] = useState("seaView");
    const [selectedPlan, setSelectedPlan] = useState("all_Inclusive");
    const [people, setPeople] = useState(0);
    const [numRoom, setNumRoom] = useState(1);
    const [hotelId,setHotelId]=useState(route.params.hotelId)
   console.log('choose',route?.params.ownerId);
    
    const dispatch = useDispatch();
    const body={
        view:selectedValue,
        hotelId:hotelId,
            }
            console.log('body',body);
const handleGet=(obj)=>{
    dispatch(fetchRoomByCategory(obj))
}
   
 
console.log('view',selectedValue);
console.log('id',hotelId);
console.log('selectedPlan',selectedPlan);
console.log('people',people);
console.log('numRoom',numRoom);

    const plus = () => {
      if (people>=0){

        setPeople(people + 1);
      }
    };
  
    const minus = () => {
      if (people>0) {
        setPeople(people - 1);
      }
    };
    const add = () => {
      if (numRoom>0){
        setNumRoom(numRoom + 1);
      }
    };
  
    const remove = () => {
      if (numRoom>0) {
        setNumRoom(numRoom - 1);
      }
    };



  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>
      <View style={styles.centeredView}>
        <Text style={styles.chooseText}>Choose What suits you the most</Text>
        <Text style={styles.emoji}>🤔</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Select View:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Sea View" value="seaView" />
              <Picker.Item label="Standard View" value="standerView" />
            </Picker>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Meal Plan:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedPlan}
              onValueChange={(itemValue) => setSelectedPlan(itemValue)}
            >
              <Picker.Item label="All Inclusive" value="all_Inclusive" />
              <Picker.Item label="Breakfast" value="breakFast" />
              <Picker.Item label="Half Board" value="halfBoard" />
            </Picker>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.subLabel}>Adults</Text>
            <Text>Age 13 Or Above</Text>
          </View>
          <View style={styles.counter}>
            <IconButton icon="minus-circle-outline" size={30} onPress={minus} />
            <Text style={styles.counterText}>{people}</Text>
            <IconButton icon="plus-circle-outline" size={30} color="red" onPress={plus} />
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.subLabel}>Room</Text>
            <Icon name='bedroom-parent' size={30} style={styles.roomIcon} />
          </View>
          <View style={styles.counter}>
            <IconButton icon="minus-circle-outline" size={30} onPress={remove} />
            <Text style={styles.counterText}>{numRoom}</Text>
            <IconButton icon="plus-circle-outline" size={30} color="red" onPress={add} />
          </View>
        </View>
      </View>

      <Button
        style={styles.searchButton}
        textColor='black'
        onPress={() => { handleGet(body), 
          navigation.navigate('Calander', { hotelId: route.params.hotelId, view: selectedValue, plan: selectedPlan, numRoom:numRoom, people:people, ownerId: route.params.ownerId });
        }}
      >
        Search
      </Button>
     
    </View>
  </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE2FC',
    padding: 20,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 48,
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'Roboto-Bold',
  },
  chooseText: {
    fontSize: 24,
    marginTop: 10,
    marginHorizontal: 18,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto-Regular',
  },
  emoji: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 14,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Medium' : 'Roboto-Medium',
  },
  subLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'Roboto-Bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto-Regular',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '50%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 50,
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#6082B6',
    marginVertical: 15,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Medium' : 'Roboto-Medium',
  },
  roomIcon: {
    color: '#7CB9E8',
    marginTop: 10,
  },
  searchButton: {
    backgroundColor: '#7CB9E8',
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
  },
});