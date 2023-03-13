import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { useNavigation } from "@react-navigation/native";

export default function Profil() {
    const navigation = useNavigation();

    const handleSIgnOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
          })
          .catch((error) => alert(error.message));
    };
  return (
    <View style={styles.container}>      
        <StatusBar style="auto" />
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Animania</Text>
        </View>
        <View style={styles.EmailContainer}>
            <Text style={styles.EmailTitre}>Actuellement connecté avec l'email :</Text>
            <Text style={styles.Email}>{auth.currentUser?.email}</Text>
        </View>
        <View style={styles.SignOut}>
            <TouchableOpacity style={styles.SignOutButton} onPress={handleSIgnOut}>
                <Text style={styles.SignOutTitle}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 40,
    color: 'blue',
    fontWeight: 'bold',
  },
  EmailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40%',
  },
  EmailTitre: {
    fontSize: 15,
  },
  Email: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  SignOut:{
    alignItems: "center",
    justifyContent: 'center',
  },
  SignOutButton:{
    backgroundColor: "blue",
    marginTop: '40%',
    width: "60%",
    padding: 15,
    borderRadius: 10,
  },
  SignOutTitle: {
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    textAlign: 'center',
  },
});