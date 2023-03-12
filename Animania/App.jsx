import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accueil from './components/Accueil';
import Favoris from './components/Favoris';
import Profil from './components/Profil';
import Recherche from './components/Recherche';

const tab = createBottomTabNavigator();

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

function FavorisScreen() {
  return (
    <View style={styles.container}>
      <Favoris />
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

export default function App() {
  return (
    <NavigationContainer>
      <tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route. name == "Accueil") {
              iconName = "home-outline"
            } else if (route. name == "Recherche") {
              iconName = "search-outline"
            } else if (route. name == "Favoris") {
              iconName = "star-outline"
            } else if (route. name == "Profil") {
              iconName = "person-outline"
            }
            return <Ionicons name={iconName} size={20} color='#000'/>
          }
        })} 
      >
        <tab.Screen name='Accueil' component={AccueilScreen} options={{ headerShown: false }}/>
        <tab.Screen name='Recherche' component={RechercheScreen} options={{ headerShown: false }}/>
        <tab.Screen name='Favoris' component={FavorisScreen} options={{ headerShown: false }}/>
        <tab.Screen name='Profil' component={ProfilScreen} options={{ headerShown: false }}/>
      </tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});