import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const Migrations = ({ onboardingImages, nav }) => {
  const scrollViewRef = useRef(null);
  const [railBackgroundColor, setRailBackgroundColor] = useState("rgba(128,128,128,0.2)");
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setRailBackgroundColor("#FFFFFF");
    if (currentPage < onboardingImages.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current.scrollTo({ x: nextPage * 550, animated: true });
      setCurrentPage(nextPage);
    } else {
      nav.replace('OwnerProfile');
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.floor(offsetX / 550);
    setCurrentPage(newPage);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {onboardingImages.map((image, index) => (
          <View key={index} style={{ width: 550, height: '100%' }}>
            <Image source={image} style={{ width: '100%', height: '100%' }} />
          </View>
        ))}
      </ScrollView>
      
      <View style={{ position: 'absolute', alignItems: 'center',        
 }}>
  <Text style={[{   color: 'white', fontWeight: 'bold', 
    textAlign: 'center',
     marginTop: 280,
    fontSize: 32}]}>
 '1. Ensure all property details are accurate and up-to-date.\n'
              '2. Respond to booking inquiries promptly.\n'
              '3. Maintain high standards of cleanliness and hospitality.\n'
              '4. Address guest issues and feedback constructively.\n',
  </Text>
        
          <TouchableOpacity onPress={handleNext} style={[{ width: 70, height: 40 , backgroundColor: 'blue', 
    borderRadius: 8,
    alignItems: 'center',
     }]}> 
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white',alignItems:"center"}}>Next</Text>
          </TouchableOpacity>


      </View>
    </View>
  );
};

const Migration = ({ navigation }) => {
  const onboardingImages = [
    // require('../../Photo/Screen1.jpeg'),
    // require('../../Photo/detail.jpeg'),
    require('../../Photo/detail2.webp'),
  ];

  return (
    <View style={{ flex: 1 }}>
      <Migrations nav={navigation} onboardingImages={onboardingImages} />
    </View>
  );
};

export default Migration;
