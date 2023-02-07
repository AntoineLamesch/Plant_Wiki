import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Pressable} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Constants from 'expo-constants';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import { TextInput } from 'react-native-paper';

import { Button } from 'react-native-paper';





import { MaterialCommunityIcons } from '@expo/vector-icons';


const MyComponent = () => {
  const [text, setText] = React.useState("");
  const [textEmail, setTextEmail] = React.useState("");
  const [password, setPassword] = useState("");
  const [isVisble, setIsVisible] = useState(true);

  function toggleSecureIcon() {
    setIsVisible(!isVisble);
  }

  return (
    <View style={styles.container}>
    <Card style ={styles.card}>
    <Text style={styles.paragraphWhite}>
       <Text>Space Craft</Text>
    </Text>
    </Card>
    <TextInput
      label="Email"
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
    <Text style={styles.paragraphBlack}>
       <Text>Read Terms and conditions</Text>
      </Text>

  <Button style={styles.button} icon="" mode="contained" onPress={() => console.log('Pressed')}>
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
    backgroundColor: '#ecf0f1',
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
  },
  button:{
    backgroundColor : '#4D0784' ,
    color : 'transparent',
  },
});


