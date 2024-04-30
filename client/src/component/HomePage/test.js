import * as React from 'react';
 import * as RN from 'react-native'; 
import React from 'react'

class MyCalendar extends React.Component {
constructor(){
    super()

    this.months = ["January", "February", "March", "April", 
    "May", "June", "July", "August", "September", "October", 
    "November", "December"];
   
   this.weekDays = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];

    this.nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.state = {
        activeDate: new Date()
    }
}
 year = this.state.activeDate.getFullYear();
  month = this.state.activeDate.getMonth();
  firstDay = new Date(year, month, 1).getDay();
 
   maxDays = this.nDays[month];
   calenderDay=()=>{
 if (month == 1) { // February
     if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
         maxDays += 1;
     }
 }}

        render() {
            return (
                <RN.View style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                  }}>
                   {this.months[this.state.activeDate.getMonth()]}  
                   {this.state.activeDate.getFullYear()}
 
                </RN.View>
            );
        }
  }
