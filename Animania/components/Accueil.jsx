import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Linking } from 'react-native';

export default function Accueil() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.buttonProfil}
          onPress={() => navigation.navigate('Profil')}
        >
          <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={setTopAnime}>
          <Text style={styles.title}>Animania</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFavoris}>
          <FontAwesome name="star" size={24} color="white" />
        </TouchableOpacity>
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
    marginTop: 40,
  },
  title: {
    fontSize: 40,
    color: 'blue',
    fontWeight: 'bold',
  },
  buttonProfil: {
    position: 'absolute',
    left: 20,
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  buttonFavoris: {
    position: 'absolute',
    right: 20,
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
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
    marginTop: 10,
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
    height: 250,
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
