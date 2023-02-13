import * as React from "react";
import { Text, StyleSheet, ImageBackground, FlatList } from "react-native";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
import { Routes } from "../navigation/Routes";

//Creator @AntoineLamesch

// You can import from local files

// or any pure javascript modules available in npm
import { Appbar, Card } from "react-native-paper";

import { useImage } from "../hooks/useImage";

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
  family_common_name: string;
  synonyms: [];
};

export const DetailsScreen = ({ route }) => {
  const Item = ({
    //Creation of a model of an item
    title,
    image_url,
    subtitle,
    bibliography,
    year,
    family_common_name,
    synonyms,
    author,
  }: Plantes) => (
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
        <Text style={styles.highlight}>Première publication : </Text> {year}
      </Text>

      <Text style={styles.textWhite}>
        <Text style={styles.highlight}>Premier recensement dans : </Text>
        {bibliography}
      </Text>

      <Text style={styles.textWhite}>
        <Text style={styles.highlight}>Auteur : </Text>
        {author}
      </Text>

      <Text style={styles.textWhite}>
        <Text style={styles.highlight}>Famille : </Text>
        {family_common_name}
      </Text>

      <Text style={styles.textWhite}>
        <Text style={styles.highlight}>Synonyme : </Text>
        {synonyms[1] + " , " + synonyms[2]}
      </Text>
    </Card>
  );

  const { result, value, name,  data } = route.params;
  console.log(name);

  const url = "fond";

  const source = useImage(url); //Use the hook named 'used image' for use image simply

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.image}>
      <SafeAreaProvider>
        <Appbar.Header style={{ backgroundColor: "transparent" }}>
          <Appbar.BackAction
            style={{ backgroundColor: "white" }}
            onPress={() => {
              {
                navigation.navigate(Routes.MAIN_SCREEN, {
                  result,
                  value,
                  name,
                  data,
                });
              }
            }}
          />
          <Appbar.Content titleStyle={{ color: "white" }} title="DETAILS" />
        </Appbar.Header>
        <SafeAreaView style={styles.container}>
          <Card style={styles.backTitle}>
            <Text style={styles.headerText}>
              <Text style={styles.highlight}>{name}</Text>
            </Text>
          </Card>
          <FlatList
            data={result.data}
            renderItem={({ item }) => (
              <Item
                title={item.common_name}
                subtitle={item.scientific_name}
                image_url={item.image_url}
                bibliography={item.bibliography}
                id={item.id}
                common_name={""}
                scientific_name={""}
                author={item.author}
                year={item.year}
                family_common_name={item.family_common_name}
                synonyms={item.synonyms}
              />
            )}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 40,
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
    backgroundColor: "#228B22",
    color: "transparent",
    marginBottom: 70,
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
    backgroundColor: "#228B22",
    color: "white",
  },
  textWhite: {
    color: "white",
    marginTop: 10,
  },
  highlight: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  backTitle: {
    backgroundColor: "#228B22",
    marginBottom: 30,
    padding: 20,
    borderColor: "white",
    borderWidth: 1,
  },
  headerText: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
