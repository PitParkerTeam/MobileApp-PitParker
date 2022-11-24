import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import getUser from './firebase/firestore';
const Stack = createNativeStackNavigator();
const options={ headerShown: false }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={options} />
        <Stack.Screen name="Favorite" component={Favorite} options={options} />
        <Stack.Screen name="History" component={History} options={options} />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          options={options}
        />
      </Stack.Navigator>
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
