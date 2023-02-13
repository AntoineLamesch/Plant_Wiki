import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Constants from "expo-constants";
import { Routes } from "../navigation/Routes";

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

import { TextInput } from "react-native-paper";

import { Button } from "react-native-paper";

import { useImage } from "../hooks/useImage";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const MyComponent = ({ navigation }) => {
  const [value, setValue] = useState("");

  function goToTermsScreen() {
    return navigation.navigate(Routes.TERMS_SCREEN);
  }

  function goToMainScreen(data, value) {
    return navigation.navigate(Routes.MAIN_SCREEN, { data, value });
  }

  function goToError() {
    return navigation.navigate(Routes.TERMS_SCREEN);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://trefle.io/api/v1/plants/search?token=tLUrGmjRQILBatsvJO7Bl3E8hhwAcszsXxrW6BLpszI&q=${value}`
      );
      const data = await response.json();
      if (data != null) {
        goToMainScreen(data, value);
      } else {
        goToError();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const url = "feuilles";

  const source = useImage(url);

  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.paragraphWhite}>
            <Text>PLANT WIKI</Text>
          </Text>
        </Card>
        <TextInput
          label="Taper un nom de plante (ex : Rose)"
          style={styles.input}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <TouchableOpacity onPress={() => goToTermsScreen()}>
          <Text style={styles.paragraphBlack}>Read Terms and conditions</Text>
        </TouchableOpacity>

        <Button
          style={styles.button}
          icon=""
          mode="contained"
          onPress={() => handleSubmit()}
        >
          Rechercher
        </Button>
      </View>
    </ImageBackground>
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
    fontSize: 18,
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
    backgroundColor: "#001D0B",
    color: "transparent",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#001D0B",
    color: "transparent",
  },
  input: {
    marginBottom: 10,
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
