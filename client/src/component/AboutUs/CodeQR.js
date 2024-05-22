// src/components/QRCodeComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet ,SafeAreaView} from 'react-native';
import axios from 'axios';
import { AP_ADRESS } from '../../apAdress';
import Icon from 'react-native-vector-icons/Ionicons';

const QRCodeComponent = ({route,navigation}) => {
  const [text, setText] = useState(user);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
// setText(1)
  // console.log(route?.params?.data?.body.userId)

   const user=route?.params?.data?.body.roomId
  console.log(user);

 
  
  useEffect(()=>{
  const generateQRCode = async () => {
    try {
      const response = await axios.get(`http://${AP_ADRESS}:3000/api/generate-qr?text=${(text)}`);
      setQrCodeUrl(response.data.url);
      console.log('res',response.data.url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };
  generateQRCode();

},[text])
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name='return-up-back' size={30} onPress={()=>navigation.navigate('Home')}/>
      </View>
    <View style={styles.inputContainer}>
      <Text style={styles.header}>Your CheckOut</Text>
    </View>
    <SafeAreaView style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{route?.params?.data?.user.firstName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hotel Name:</Text>
          <Text style={styles.value}>Sunset Inn</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{route?.params?.data?.user.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{route?.params?.data?.user.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{route?.params?.data?.body.newPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Room N°:</Text>
          <Text style={styles.value}>{route?.params?.data?.body.roomId}</Text>
        </View>
      </View>
      <View style={styles.qrContainer}>
        <Text style={styles.title}>Your QR Code</Text>
        {qrCodeUrl ? (
          <Image source={{ uri: qrCodeUrl }} style={styles.qrCode} />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  qrContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  iconContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },

});

export default QRCodeComponent;
