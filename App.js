import {useState , useEffect, useCallback} from "react";
import { View, StyleSheet, Image, TouchableOpacity, PermissionsAndroid } from "react-native";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";


const App = () => {
   
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    
  const [toggle, setToggle] = useState(false);
  // const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);
  const handleChangeToggle = useCallback(() => setToggle(oldToggle => !oldToggle), [toggle] )

  useEffect(() => {Torch.switchState(toggle);    
    },[toggle]);
    
  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
     });
     return() => subscription.remove();
       },[]);

  return(
  
      <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>

      <Image
      style={style.lightOn}
      source={
        toggle
        ? require('./assets/icons/sun.png')
        : require('./assets/icons/moon.png')
      } 
      />
      </TouchableOpacity>
  </View>

);
}
export default App

const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
});