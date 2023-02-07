import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Constants from 'expo-constants';
import {Routes} from '../navigation/Routes';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import { TextInput } from 'react-native-paper';

import { Button } from 'react-native-paper';

import { useImage } from "../hooks/useImage";





import { MaterialCommunityIcons } from '@expo/vector-icons';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


const MyComponent = ({ navigation }) => {
  const [text, setText] = React.useState("");
  const [textEmail, setTextEmail] = React.useState("");
  const [password, setPassword] = useState("");
  const [isVisble, setIsVisible] = useState(true);

  function toggleSecureIcon() {
    setIsVisible(!isVisble);
  }

  function goToTermsScreen(){

    return navigation.navigate(Routes.TERMS_SCREEN);

  }

  function goToStarshipFeedScreen(){

    return navigation.navigate(Routes.STARSHIP_FEED_SCREEN);

  }

  const url = 'clone-trooper';

  const source = useImage(url);

  return (
    <View style={styles.container}> 
    <Card style={styles.backgroundTrans}>
    <Card.Cover source={source} style={styles.cover}  resizeMode={'contain'}/>
    </Card>
    <Card style ={styles.card}>
    <Text style={styles.paragraphWhite}>
       <Text>Space Craft</Text>
    </Text>
    </Card>
    <TextInput
      label="Email"
      style = {styles.input}
      value={textEmail}
      onChangeText={text => setTextEmail(text)}
    />
    <TextInput
       label="Password"
       value={password}
       secureTextEntry={isVisble}
       onChangeText={(value) => setPassword(value)}
       right={
         <TextInput.Icon
           onPress={toggleSecureIcon}
           icon={isVisble ? "eye-off" : "eye"}
         />
       }
    />
      <TouchableOpacity
         onPress={() => goToTermsScreen()}>
        <Text style={styles.paragraphWhite}>Read Terms and conditions</Text>
    </TouchableOpacity>

  <Button style={styles.button} icon="" mode="contained" onPress={() => goToStarshipFeedScreen()}>
    Login
  </Button>
    </View>
  );
};

export default MyComponent;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    padding: 8,
  },
  paragraphWhite: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color : 'white',
  },
   paragraphBlack: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color : 'black',
  },
  card:{
    backgroundColor : '#4D0784' ,
    color : 'transparent',
    marginBottom : 50,
  },
  button:{
    backgroundColor : '#4D0784' ,
    color : 'transparent',
  },
  input:{
    marginBottom : 10,
  },
  cover:{
    backgroundColor : "transparent",
    bottom : 50,
  },
  backgroundTrans:{
    backgroundColor : "transparent",
  }
});


