import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton,Button } from 'react-native-paper';
import { View ,Text} from 'react-native';

export default function ChooseChildren() {
    const [count, setCount] = useState(0);

    const plus = () => {
      if (count < 3){

        setCount(count + 1);
      }
    };
  
    const minus = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };




  return (
    <View style={{backgroundColor:'#DCE2FC',flex:1}}>
    <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:20,marginLeft:20}}>
    <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>
    <View style={{ backgroundColor: '#89CFF0', borderRadius: 30,padding:'auto'}}>
  <Icon name='arrow-back' size={25} />
  </View>
  Choose Who's Coming
  </Text>
</View>

{/* //this form to add people */}
    <View style={{backgroundColor:'white',marginTop:140,margin:15,borderRadius:15,height:'40%'}}>
    <View style={{ marginTop: 35, flexDirection: 'row', justifyContent: 'space-between',margin:18 }}>
        <View>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Adults</Text>
        <Text>Age 13 Or Above</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10%' }}>
        <IconButton icon="plus-circle-outline" size={30} onPress={plus} color="red" style={{color:'red'}} />
         <Text style={{fontSize:17}}>{count}</Text>
         <IconButton icon="minus-circle-outline" size={30} onPress={minus}/>
       </View>
    </View>
    <Text style={{height:1,backgroundColor:'#6082B6',marginTop:30}}>h</Text>
    <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-between',margin:18 }}>
  <View style={{  }}>
    <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Children</Text>
    <Text>Ages 2-12</Text>
  </View>
  <View>
    <Text style={{marginTop:10,marginRight:40,fontWeight:'bold',color:'green',fontSize:20}}>Free</Text>
  </View>
</View>
</View>
<View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between',margin:18 }}>
    <View>
    <Text style={{fontWeight:'bold',fontSize:14,color:'black',marginTop:9}}>Queries? Reach out for personalized stays</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%',justifyContent:'space-between',margin:5 }}>
    <Icon name='local-phone'size={30}/>
    <Icon name='email' size={30}/>
    </View>
</View> 
{/* this form to continue or cancel  */}
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '18%',margin:20 }}>
    <Button  mode="contained" style={{width:'30%',backgroundColor:'#0000FF',opacity:.7}}>
    Reset
  </Button>
  <Button  mode="contained" style={{width:'30%',backgroundColor:'#0000FF'}}>
   Save
  </Button>
    </View>
</View>
  )
}
