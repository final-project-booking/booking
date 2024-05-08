import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MapView, { Marker } from 'react-native-maps';

const AdvancedFilter = ({ onFilter }) => {
  const [rating, setRating] = useState(null);
  const [priceRange, setPriceRange] = useState([50, 5000]);
  const [location, setLocation] = useState(null);

  const handleReset = () => {
    setRating(null);
    setPriceRange([50, 5000]);
    setLocation(null);
    onFilter(null, [50, 5000], null);
  };

  const applyFilter = () => {
    onFilter(rating, priceRange, location);
  };

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating === rating ? null : selectedRating);
  };

  const handleLocationSelect = (coords) => {
    setLocation(coords);
  };

  const renderStars = (numStars) => {
    let stars = [];
    for (let i = 1; i <= numStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRatingSelect(i)}
          style={{ marginRight: 5 }}
        >
          <Icon
            name={rating && rating >= i ? 'star' : 'star-border'}
            size={24}
            color={rating && rating >= i ? 'orange' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterItem}>
        <Text style={styles.title}>
          <Icon name="star" size={24} color="black" />
          {'  '}
          Rating
        </Text>
        <View style={styles.ratingContainer}>{renderStars(5)}</View>
      </View>

      <View style={styles.filterItem}>
        <Text style={styles.title}>
          <Icon name="attach-money" size={24} color="black" />
          {'  '}
          Price Range
        </Text>
        <View style={styles.priceRangeContainer}>
          <Text style={styles.priceLabel}>${priceRange[0]}</Text>
          <MultiSlider
            values={priceRange}
            sliderLength={200}
            onValuesChange={(values) => setPriceRange(values)}
            min={50}
            max={5000}
            step={50}
            selectedStyle={{
              backgroundColor: 'blue',
            }}
            unselectedStyle={{
              backgroundColor: 'silver',
            }}
          />
          <Text style={styles.priceLabel}>${priceRange[1]}</Text>
        </View>
      </View>

      <View style={styles.filterItem}>
        <Text style={styles.title}>
          <Icon name="location-on" size={24} color="black" />
          {'  '}
          Location
        </Text>
        {/* Location filter UI */}
        <MapView
          style={styles.map}
          onPress={(e) => handleLocationSelect(e.nativeEvent.coordinate)}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
      </View>

      <TouchableOpacity onPress={applyFilter} style={styles.applyButton}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  applyButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  resetText: {
    color: 'blue',
    fontSize: 16,
  },
  filterItem: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  map: {
    height: 200,
    marginTop: 8,
  },
});

export default AdvancedFilter;
