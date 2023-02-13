import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
import Constants from "expo-constants";
import { Routes } from "../navigation/Routes";

// You can import from local files

// or any pure javascript modules available in npm
import { Appbar, Card } from "react-native-paper";

import { TextInput } from "react-native-paper";

import { Button } from "react-native-paper";

import { useImage } from "../hooks/useImage";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Plantes = {
  id: number;
  common_name: string;
  scientific_name: string;
  image_url: string;
  author: string;
  title: string;
  subtitle: string;
  bibliography: string;
  year: string;
  family_common_name : string;
  synonyms : [];
};

const MyComponent = ({ route }) => {
  const Item = ({ title, image_url, subtitle, bibliography, year, family_common_name, synonyms}: Plantes) => (
    
      <Card style={styles.backColor}>
        <Card.Title
          titleStyle={{ color: "white" }}
          subtitleStyle={{ color: "white" }}
          title={title}
          subtitle={subtitle}
        />
        <Card.Cover source={{ uri: image_url }} />
        <Text style={styles.textWhite}><Text style={styles.highlight}>Bibliographie : </Text>{bibliography}</Text>

        <Text style={styles.textWhite}><Text style={styles.highlight}> Année de découverte :</Text> {year}</Text>

        <Text style={styles.textWhite}><Text style={styles.highlight}>Nom commun de la famille : </Text>{family_common_name}</Text>

        <Text style={styles.textWhite}><Text style={styles.highlight}>Synonyme : </Text>{synonyms[1] + " , " +synonyms[2]}</Text>
      </Card>
  );

  function goToTermsScreen() {
    return navigation.navigate(Routes.TERMS_SCREEN);
  }

  function goToMainScreen(data, value) {
    return navigation.navigate(Routes.MAIN_SCREEN, { data });
  }

  function goToError() {
    return navigation.navigate(Routes.TERMS_SCREEN);
  }

  const { data, value } = route.params;
  console.log(value);

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

  const url = "fond";

  const source = useImage(url);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.image}>
      <SafeAreaProvider>
        <Appbar.Header style={{ backgroundColor: "transparent" }}>
          <Appbar.BackAction
            style={{ backgroundColor: "white" }}
            onPress={() => {
              {
                navigation.navigate(Routes.MAIN_SCREEN);
              }
            }}
          />
          <Appbar.Content titleStyle={{ color: "white" }} title="Main Screen" />
        </Appbar.Header>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={data.data}
              renderItem={({ item }) => (
                  <Item
                    title={item.common_name}
                    subtitle={item.scientific_name}
                    image_url={item.image_url}
                    bibliography={item.bibliography}
                    id={item.id}
                    common_name={""}
                    scientific_name={""}
                    author={""}
                    year={item.year}
                    family_common_name ={item.family_common_name}
                    synonyms = {item.synonyms}
                  />
              )}
            />
          </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop : 100,
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
  card: {
    backgroundColor: "#001D0B",
    color: "transparent",
    marginTOP: 50,
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
  backColor: {
    backgroundColor: "#001D0B",
    color: "white",
  },
  textWhite: {
    color: "white",
    marginTop : 10,
  },
  highlight: {
    color: "yellow",
    fontWeight : "bold",
  },
});
