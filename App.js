import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import World from './src/World';


export default function App() {

  const BottomTabBar = createBottomTabNavigator();
  const navigation = useNavigation();
  const TabNavigator = () => {
    return (
      <BottomTabBar.Navigator>
        <BottomTabBar.Screen name="Menu" component={HomeScreen} />
        <BottomTabBar.Screen name="Game" component={GameScreen} />
        <BottomTabBar.Screen name="Settings" component={SettingsScreen} />
      </BottomTabBar.Navigator>
    );
  };
  
  const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Welcome to the moving ball game</Text>
        <NavigationContainer>
        <Button title="Start G  ame" onPress={() => navigation.navigate('Game')} />
        </NavigationContainer>
      </View>
    );
  };

  const GameScreen = () => {
    return (
      <World />
    );
  };

  const SettingsScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
      </View>
    )
  };

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
