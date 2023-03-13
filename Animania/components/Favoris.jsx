import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';
import { Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Accueil() {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    async function fetchTopAnime() {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setTopAnime(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTopAnime();
  }, []);

  return (
    <View style={styles.container}>      
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Animania</Text>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.topTitle}>Vos Favoris :</Text>
      </View>
      <View style={styles.AnimeContainer}>
        <FlatList
          data={topAnime.data}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.topAnimeItem}>
              <Image source={{ uri: item.images.jpg.image_url }} style={styles.AnimeItemImage} />
              <Text style={styles.AnimeItemTitle}>{item.title})</Text>
              <Text style={styles.AnimeItemRank}>#{item.rank}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.buttonText}>Voir sur MyAnimeList</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          numColumns={2}  // Ajout de la prop "numColumns"
        />
      </View>      
    </View>
  );
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
  topContainer:{
    flexDirection: 'row',
    marginLeft: 20,
  },
  topTitle:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  AnimeContainer: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  topAnimeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topAnimeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topAnimeItem: {
    width: '48%',
    marginBottom: 20,
    marginLeft: 5,
  },
  AnimeItemImage: {
    width: '100%',
    height: 260,
    borderRadius: 10,
    marginBottom: 10,
  },
  topAnimeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topAnimeEpisodes: {
    fontSize: 14,
    color: 'gray',
  },
});
