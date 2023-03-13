import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Recherche() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  async function searchAnime() {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>      
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Animania</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="One Piece..."
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchAnime}>
          <FontAwesome name="search" size={24} color="white" />          
        </TouchableOpacity>
      </View>
      <View style={styles.AnimeContainer}>
        <FlatList
          data={searchResults.data}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.topAnimeItem}>
              <Image source={{ uri: item.images.jpg.image_url }} style={styles.AnimeItemImage} />
              <Text style={styles.AnimeItemTitle}>{item.title})</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
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
