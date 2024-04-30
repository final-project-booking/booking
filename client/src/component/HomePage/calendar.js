import * as React from 'react';
 import * as RN from 'react-native'; 
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CalendarDays from './CalenderDays'; // Assuming you have this component
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date()
    }
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  nextDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() + 1)) });
  }

  previousDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() - 1)) });
  }

  render() {
    return (
      <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</Text>
          </View>
          <View style={styles.toolsContainer}>
            <TouchableOpacity onPress={this.previousDay}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text>{this.months[this.state.currentDay.getMonth()].substring(0, 3)} {this.state.currentDay.getDate()}</Text>
            <TouchableOpacity onPress={this.nextDay}>
              <MaterialIcons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.calendarBody}>
          <View style={styles.tableHeader}>
            {this.weekdays.map((weekday, index) => (
              <View key={index} style={styles.weekday}>
                <Text>{weekday}</Text>
              </View>
            ))}
          </View>
          <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </View>
        hello world
      </View>
    )
  }
}

const styles = {
  calendar: {
    flex: 1,
    backgroundColor: 'white',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toolsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarBody: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  weekday: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
};
