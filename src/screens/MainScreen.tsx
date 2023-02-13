import React from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Button, Card, Appbar, ActivityIndicator } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "../navigation/Routes";
import { useNavigation } from "@react-navigation/native";

import { useImage } from "../hooks/useImage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Creator @AntoineLamesch

type Plantes = {
  id: number;
  common_name: string;
  scientific_name: string;
  image_url: string;
  author: string;
  title: string;
  subtitle: string;
  bibliography: string;
  year: number;
};

const Item = (
  { title, image_url, subtitle, year, id }: Plantes //Creation of a model of an item
) => (
  <Card style={styles.backColor}>
    <Card.Title
      titleStyle={{ color: "white" }}
      subtitleStyle={{ color: "white" }}
      title={
        <Text>
          <Text style={styles.highlight}>Nom : </Text>
          {title}
        </Text>
      }
      subtitle={
        <Text>
          <Text style={styles.highlight}>Nom scientifique : </Text>
          {subtitle}
        </Text>
      }
    />
    <Card.Cover source={{ uri: image_url }} />
    <Text style={styles.textWhite}>
      <Text style={styles.highlight}>Première publication : </Text>
      {year}
    </Text>
  </Card>
);

export const MainScreen = ({ route }) => {
  const { data, value } = route.params;

  console.log(value);
  console.log(data.data);

  function goToDetailsScreen(result: any, value: any, name: any, data: any) {
    return navigation.navigate(Routes.DETAILS_SCREEN, {
      result,
      value,
      name,
      data,
    });
  }

  const dataSubmit = async (name) => {
    //Submit the API request with the value in the input, if it is good go to the main screen else go to error
    try {
      const response = await fetch(
        `https://trefle.io/api/v1/plants/?token=tLUrGmjRQILBatsvJO7Bl3E8hhwAcszsXxrW6BLpszI&filter[common_name]=${name}`
      );
      const result = await response.json();
      if (data != null) {
        goToDetailsScreen(result, value, name, data);
      } else {
        goToDetailsScreen(result, value, name, data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const source = useImage("fond"); //Use the hook named 'used image' for use image simply

  const navigation = useNavigation<NativeStackNavigationProp<any>>(); //useNavigationProp to correct a bug

  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.image}>
      <SafeAreaProvider>
        <Appbar.Header style={{ backgroundColor: "transparent" }}>
          <Appbar.BackAction
            style={{ backgroundColor: "white" }}
            onPress={() => {
              {
                navigation.navigate(Routes.RESEARCH_SCREEN);
              }
            }}
          />
          <Appbar.Content
            titleStyle={{ color: "white" }}
            title="Ecran Principal"
          />
        </Appbar.Header>
        <View style={{ flex: 1, padding: 24 }}>
          <SafeAreaView style={styles.container}>
            <Card style={styles.backTitle}>
              <Text style={styles.headerText}>
                Votre recherche pour{" "}
                <Text style={styles.highlight}>{value}</Text>
              </Text>
            </Card>
            <FlatList //Render a flatlist of all the data provide by the precedent screen and on the model of the items declared at the top
              data={data.data}
              renderItem={({ item }) => (
                <Card style={styles.color}>
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
                  />
                  <Button
                    style={styles.color}
                    onPress={() => {
                      {
                        dataSubmit(item.common_name);
                      }
                    }}
                  >
                    <Text style={styles.textWhite}>VOIR +</Text>
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
  color: {
    backgroundColor: "#228B22",
    marginBottom: 10,
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
    textAlignVertical: "center",
  },
  backWhite: {
    backgroundColor: "white",
    color: "white",
    marginBottom: 10,
    padding: 20,
  },
  backTitle: {
    backgroundColor: "#228B22",
    marginBottom: 10,
    padding: 20,
    borderColor: "white",
    borderWidth: 1,
  },
  backColor: {
    backgroundColor: "#228B22",
    color: "white",
    marginBottom: 10,
  },
  view: {
    marginBottom: 20,
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
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
