import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const FilterItem = ({ title, onResetPress, children }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      {onResetPress && (
        <TouchableOpacity onPress={onResetPress}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginRight: 16,
  },
  resetText: { color: 'blue', fontWeight: '500', top: -3 },
});

export default FilterItem;
