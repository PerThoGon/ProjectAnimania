import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {auth} from "../firebase";

export default function Profil() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            navigation.replace("Home");
        }
        });
        return unsubscribe;
    }, []);

    const SignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Registered in with:", user.email);
          })
          .catch((error) => alert(error.message));
      };
    
      const SignIn = () => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Logged in with:", user.email);
          })
          .catch((error) => alert(error.message));
      };

  return (
    <View style={styles.container} behavior="padding">
    <View style={styles.titleContainer}>
        <Text style={styles.title}>Animania</Text>
    </View>
    <View style={styles.inputContainer}>
        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        />
        <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
        />
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={SignIn} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={SignUp}
        style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    backgroundColor:'#FFF',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
titleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
},
title: {
  fontSize: 40,
  color: 'blue',
  fontWeight: 'bold',
},
inputContainer: {
    width: "80%",
},
input: {
    borderColor: "blue",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
},
buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
},
button: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
},
buttonOutline: {
    backgroundColor: "white",
    marginTop: 10,
    borderColor: "blue",
    borderWidth: 2,
},
buttonText: {
    color: "white",
    fontWeight: 700,
    fontSize: 16,
},
buttonOutlineText: {
    color: "blue",
    fontWeight: 700,
    fontSize: 16,
},
});




