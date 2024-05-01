import React, {  useState,useEffect } from 'react';

import { View } from 'react-native';

import { io } from "socket.io-client";
const socket = io('http://192.168.1.1:4000');

export default function chatPage() {
    // const [viewId,setViewId]=useState(0)
    // const cUser=useSelector((state) => state.user.userInfo);
    // const rooms = useSelector((state) => state.user.room);
 
    // const id= cUser?cUser.id:null;

    // useEffect(()=>{
  
    //     id?dispatch(getRoomByUserId(id)):console.log("nothing to do")
      
    //    },[id])
    //    useEffect(()=>{
    //     const  token=localStorage.getItem('token')
    //     console.log(token);
        
    //     if(token) {
    //       dispatch(oneUser(token))
    //     }
      
    //   },[])

    //   const changeView=(id)=>{
    //     console.log("idddd view",id)
    //     setViewId(id)
    //    }


  return (
    // <View style={{ flex: 1 }}>
    //   {/* <ChatBar changeView={changeView} rooms={rooms} id={id} /> */}
    //   <ScrollView>
    //     {rooms.map((room, i) => (
    //       viewId === room.id && (
    //         <View key={i}>
    //           {/* <ChatBody socket={socket} rooms={room} /> */}
    //         </View>
    //       )
    //     ))}
    //   </ScrollView>
    // </View>
    <View></View>
  )
}
