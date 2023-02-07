import React from 'react';

import {
    StyleSheet, Text, View, FlatList, Image, TouchableOpacity, StatusBar, ScrollView 
} from 'react-native';
import { Button, Card, Appbar} from 'react-native-paper';
import AppbarHeader from 'react-native-paper/lib/typescript/components/Appbar/AppbarHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {Routes} from '../navigation/Routes';

import { default as dataJson } from "../../api/data2.json";

import { useImage } from "../hooks/useImage";



function Item({ item }) {
    //const urlRacc = item.name.toLowerCase();
    //const urlRacc2 = urlRacc.split(/\s+/).join('');
    const source = useImage(item.name);


    return (
    <Card style ={styles.backBlack}>
    <Card.Title  titleStyle={{ color: "white" }} subtitleStyle={{color: "white"}} title={item.name} subtitle={item.model}/>
    <Card.Cover source={source} />
    <Card.Content>
      <Text style ={styles.text}>CREW :  {item.crew}</Text>
      <Text style ={styles.text}>COST IN CREDITS : {item.cost_in_credits}</Text>
    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
    );
  }



const DATA = dataJson.results.map((item)=>({

    name: item.name,
    model: item.model,
    crew: item.crew,
    hyperdrive_rating: item.hyperdrive_rating,
    cost_in_credits: item.cost_in_credits,
    url: item.url,
    passengers : item.passengers


}));





export const StarshipFeedScreen = (navigation) => {


  

  


    return (
      <SafeAreaProvider>
      <ScrollView style = {{ backgroundColor : "black"}}>
        <FlatList
          style={styles.backBlack}
          data={DATA}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.url}
        />
      </ScrollView>
      </SafeAreaProvider>
 
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      display : 'flex',
      flexDirection : 'column',
    },
    title: {
      fontSize: 32,
    },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5,
      },
    text:{
      marginTop:10,
      marginBottom:10,
      color:"white",
      },
      textWhite:{
        color:"white",
      },
    backBlack:{

      backgroundColor:"black",
      color:"white",
    }
  });