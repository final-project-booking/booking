import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, StatusBar } from 'react-native';
import arrowRight from '../../Photo/arrow-right.png';
import SwipeButton from 'rn-swipe-button';

const OnboardingScreen = ({ onboardingImages, nav }) => {
  const scrollViewRef = useRef(null);
  const [railBackgroundColor, setRailBackgroundColor] = useState("rgba(128,128,128,0.2)");
  const [currentPage, setCurrentPage] = useState(0);
  const [swipeStatusMessage, setSwipeStatusMessage] = useState('ENJOY HOLIDAYS');

  const handleNext = () => {
    setRailBackgroundColor("#FFFFFF");
    if (currentPage < onboardingImages.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current.scrollTo({ x: nextPage * 550, animated: true });
      setCurrentPage(nextPage);
    } else {
      nav.replace('AppFace');
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
      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        <View style={[{ width: 300, height: 100 }]}>
          <SwipeButton
            thumbIconImageSource={arrowRight}
            onSwipeSuccess={handleNext}
            title={swipeStatusMessage} 
            railBackgroundColor={railBackgroundColor}
            railBorderColor={railBackgroundColor}
            thumbIconBackgroundColor={railBackgroundColor}
            thumbIconBorderColor="#DCE2FC"
            thumbIconImageStyles={{ width: 20, height: 20 }}
          />
        </View>
      </View>
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  const onboardingImages = [
    require('../../Photo/Screen1.jpeg'),
    // require('../../Photo/screen2.jpg'),
    // require('../../Photo/screen3.jpeg'),
  ];

  return (
    <View style={{ flex: 1 }}>
      <OnboardingScreen nav={navigation} onboardingImages={onboardingImages} />
    </View>
  );
};

export default Onboarding;
