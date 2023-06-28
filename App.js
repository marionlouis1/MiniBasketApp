import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import World from './src/World';


export default function App() {

  const BottomTabBar = createBottomTabNavigator();
  
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
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style = {{height:'33%', justifyContent:'bottom'}}>
        <Image style={styles.stretch} source={require("./assets/logoHomeScreen.png")}/>
        </View>
      <View style={{height:'66%',justifyContent:'center'}}>
        <Text>Welcome to the moving ball game</Text>
        <Button title="Start Game" onPress={() => navigation.navigate('Game')} />
      </View>
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

  stretch: {
    justifyContent: 'center',
    width: 300,
    height: 200,
  },
});
