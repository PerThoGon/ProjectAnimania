import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accueil from './components/Accueil';
import Profil from './components/Profil';
import Recherche from './components/Recherche';
import LoginScreen from './components/LogInScreen';

const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App(){
  function TabBar() {
    return (    
      <tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route. name === "Accueil") {
              iconName = "home-outline"
            } else if (route. name === "Recherche") {
              iconName = "search-outline"
            } else if (route. name === "Profil") {
              iconName = "person-outline"
            }
            return <Ionicons name={iconName} size={20} color='#000'/>
          }
        })} 
      >
        <tab.Screen name='Accueil' component={AccueilScreen} options={{ headerShown: false }}/>
        <tab.Screen name='Recherche' component={RechercheScreen} options={{ headerShown: false }}/>
        <tab.Screen name='Profil' component={ProfilScreen} options={{ headerShown: false }}/>
      </tab.Navigator>
    );
  }

  function AccueilScreen() {
    return (
      <View style={styles.container}>
        <Accueil/>
      </View>    
    );
  }
  
  function RechercheScreen() {
    return (
      <View style={styles.container}>
        <Recherche/>
      </View>
    );
  }
  
  function ProfilScreen() {
    return (
      <View style={styles.container}>
        <Profil />
      </View>    
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" >
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }}
          />
        <Stack.Screen 
          name="TabBar" 
          component={TabBar} 
          options={{ headerShown: false }}
          />
        <Stack.Screen 
          name="Accueil" 
          component={Accueil} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
