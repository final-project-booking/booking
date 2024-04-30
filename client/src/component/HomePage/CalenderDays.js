import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CalendarDays = (props) => {
  const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
      year: firstDayOfMonth.getFullYear()
    }

    currentDays.push(calendarDay);
  }

  return (
    <View style={styles.tableContent}>
      {currentDays.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.calendarDay,
            day.currentMonth && styles.currentMonth,
            day.selected && styles.selected
          ]}
          onPress={() => props.changeCurrentDay(day)}
        >
          <Text>{day.number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = {
  tableContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  currentMonth: {
    backgroundColor: 'white',
  },
  selected: {
    backgroundColor: 'blue',
  },
};

export default CalendarDays;
