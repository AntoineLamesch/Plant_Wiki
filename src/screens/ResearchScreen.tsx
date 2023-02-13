import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Routes } from "../navigation/Routes";

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

import { TextInput } from "react-native-paper";

import { Button } from "react-native-paper";

import { useImage } from "../hooks/useImage";

//Creator @AntoineLamesch

const DismissKeyboard = (
  { children } //The fonction create for exit symply the keyboard with simple touch all ever the screen
) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MyComponent = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  function goToMainScreen(data: any, value: string) {
    return navigation.navigate(Routes.MAIN_SCREEN, { data, value });
  }

  const dataSubmit = async () => {
    //Submit the API request with the value in the input, if it is good go to the main screen elese go to error
    try {
      const response = await fetch(
        `https://trefle.io/api/v1/plants/search?token=tLUrGmjRQILBatsvJO7Bl3E8hhwAcszsXxrW6BLpszI&q=${value}`
      );
      const data = await response.json();
      if (data != null) {
        goToMainScreen(data, value);
      } else {
        goToMainScreen(data, value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (value: string) => {
    //Verification of the length of the value gave by the user
    if (value.trim().length < 2) {
      Alert.alert("Alerte", "Veuillez rentrer une valeur");
      return;
    }
    if (value == "") {
      Alert.alert("Alerte", "Veuillez rentrer une valeur");
      return;
    } else {
      dataSubmit();
    }
  };

  const url = "accueil";

  const source = useImage(url); //Use the hook named 'used image' for use image simply

  return (
    <DismissKeyboard>
      <ImageBackground source={source} resizeMode="cover" style={styles.image}>
        <DismissKeyboard>
          <View style={styles.container}>
            <Card style={styles.card}>
              <Text style={styles.paragraphWhite}>
                <Text>PLANT WIKI</Text>
              </Text>
            </Card>
            <TextInput
              label="Tapez un nom de plante (ex : Rose)"
              keyboardAppearance="dark" //Color of the keyboard, only on ios
              maxLength={30} //Maximum length of the value submit in the input
              selectionColor="green"
              textColor="green"
              activeUnderlineColor="green" //The color of the input when is it focused
              style={styles.input}
              theme={
                inputFocused //When the input is focused or not
                  ? { colors: { text: "green" } }
                  : { colors: { onSurfaceVariant: "green" } }
              }
              value={value}
              onChangeText={(text) => setValue(text)}
              onFocus={() => setInputFocused(true)} //When the input is focused
              onBlur={() => setInputFocused(false)} //When the user exit the input
            />

            <Button
              style={styles.button}
              icon=""
              mode="contained"
              onPress={() => onSubmit(value)}
            >
              Rechercher
            </Button>
          </View>
        </DismissKeyboard>
      </ImageBackground>
    </DismissKeyboard>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 200,
  },
  paragraphWhite: {
    margin: 24,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  paragraphBlack: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  card: {
    backgroundColor: "#00000000",
    Top: 10,
    marginBottom: 0,
    position: "relative",
    padding: 20,
  },
  button: {
    backgroundColor: "#18B200",
    borderColor: "white",
    borderWidth: 2,
  },
  input: {
    marginTop: 50,
    marginBottom: 100,
    borderRadius: 2,
    padding: 10,
    backgroundColor: "white",
  },
  cover: {
    backgroundColor: "transparent",
    bottom: 50,
  },
  backgroundTrans: {
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    backgroundAttachment: "local",
  },
});
