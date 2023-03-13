import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { useNavigation } from "@react-navigation/native";

export default function Profil() {
  return (
    <View style={styles.container}>      
        <StatusBar style="auto" />
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Animania</Text>
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
});