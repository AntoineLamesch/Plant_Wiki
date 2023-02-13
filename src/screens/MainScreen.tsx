import React, { Suspense, useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Button, Card, Appbar, ActivityIndicator } from "react-native-paper";
import AppbarHeader from "react-native-paper/lib/typescript/components/Appbar/AppbarHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Routes } from "../navigation/Routes";
import { useNavigation } from "@react-navigation/native";
import { default as dataJson } from "../../api/data2.json";

import { useImage } from "../hooks/useImage";
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
};

const Item = ({ title, image_url, subtitle, bibliography, id }: Plantes) => (
  <View style={styles.backColor}>
    <Card style={styles.backColor}>
      <Card.Title
        titleStyle={{ color: "white" }}
        subtitleStyle={{ color: "white" }}
        title={title}
        subtitle={subtitle}
      />
      <Card.Cover source={{ uri: image_url }} />
      <Text style={styles.textWhite}>{bibliography}</Text>
    </Card>
  </View>
);

export const MainScreen = ({ route }) => {
  const { data, value } = route.params;

  console.log(value);
  console.log(data.data);

  function goToError() {
    return navigation.navigate(Routes.TERMS_SCREEN);
  }

  function goToDetailsScreen(data: any, value: any) {
    return navigation.navigate(Routes.DETAILS_SCREEN, { data, value });
  }

  const handleSubmit = async (name) => {
    try {
      const response = await fetch(
        `https://trefle.io/api/v1/plants/?token=tLUrGmjRQILBatsvJO7Bl3E8hhwAcszsXxrW6BLpszI&filter[common_name]=${name}`
      );
      const data = await response.json();
      if (data != null) {
        goToDetailsScreen(data, name);
      } else {
        goToError();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const source = useImage("fond");

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleNavigation = () => {
    console.log("go");
    navigation.navigate(Routes.TERMS_SCREEN);
  };

  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.image}>
      <SafeAreaProvider>
        <Appbar.Header style={{ backgroundColor: "transparent" }}>
          <Appbar.BackAction
            style={{ backgroundColor: "white" }}
            onPress={() => {
              {
                navigation.navigate(Routes.LOGIN_SCREEN);
              }
            }}
          />
          <Appbar.Content titleStyle={{ color: "white" }} title="Main Screen" />
        </Appbar.Header>
        <View style={{ flex: 1, padding: 24 }}>
          <SafeAreaView style={styles.container}>
            <Card style={styles.backBlack}>
              <Text style={styles.headerText}>
                Votre recherche pour{" "}
                <Text style={styles.highlight}>{value}</Text>
              </Text>
            </Card>
            <FlatList
              data={data.data}
              renderItem={({ item }) => (
                <Card>
                  <Item
                    title={item.common_name}
                    subtitle={item.scientific_name}
                    image_url={item.image_url}
                    bibliography={item.bibliography}
                    id={item.id}
                    common_name={""}
                    scientific_name={""}
                    author={""}
                  />
                  <Button
                    onPress={() => {
                      {
                        handleSubmit(item.common_name);
                      }
                    }}
                  >
                    <Text style={styles.textCardBlack}>VOIR +</Text>
                  </Button>
                </Card>
              )}
            />
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 32,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    color: "white",
  },
  textWhite: {
    color: "white",
  },
  backWhite: {
    backgroundColor: "white",
    color: "white",
    marginBottom: 10,
    padding: 20,
  },
  backBlack: {
    backgroundColor: "black",
    marginBottom: 10,
    padding: 20,
  },
  backColor: {
    backgroundColor: "#001D0B",
    color: "white",
    marginBottom: 10,
  },
  textCard: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  textCardBlack: {
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    backgroundAttachment: "local",
  },
  headerText: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
  highlight: {
    color: "yellow",
  },
});
