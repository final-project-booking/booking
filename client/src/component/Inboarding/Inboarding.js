import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const OnboardingScreen = ({ onboardingImages }) => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < onboardingImages.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current.scrollTo({ x: nextPage * 550, animated: true });
      setCurrentPage(nextPage);
    } else {
      
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
      setCurrentPage(0);
    }
  };
  
  const handleBack = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      scrollViewRef.current.scrollTo({ x: prevPage * 550, animated: true });
      setCurrentPage(prevPage);
    } else {
     
      const lastPage = onboardingImages.length - 1;
      scrollViewRef.current.ssc+rollTo({ x: lastPage * 550, animated: true });
      setCurrentPage(lastPage);
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
        showsHorizontalScrollIndicator={true}
        bounces={false}
      >
        {onboardingImages.map((image, index) => (
          <View key={index} style={{ width: 550, height: '100%' }}>
            <Image source={image} style={{ width: '100%', height: '100%' }} />
          </View>
        ))}
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
      
          <TouchableOpacity onPress={handleBack}>
            <Text> Back</Text>
          </TouchableOpacity>
     
        <TouchableOpacity onPress={handleNext}>
          <Text> Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};




const Inboarding = ({navigation}) => {
  const onboardingImages = [
    require('../../Photo/Screen1.jpeg'),
    require('../../Photo/screen2.jpg'),
    require('../../Photo/screen3.jpeg'),

  ];

  return (

    <View style={{ flex: 1 }}>
      <OnboardingScreen onboardingImages={onboardingImages} />
    </View>
  );
};

export default Inboarding;
