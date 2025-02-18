import React, { useState, useEffect } from "react";
import { 
  View, FlatList, ActivityIndicator, TouchableOpacity, 
  Image, StyleSheet, Alert, Text, Animated, Easing 
} from "react-native";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { Ionicons } from "@expo/vector-icons";

const ListingPage = ({ navigation }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchItems(page);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [page]);

  const fetchItems = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const postsResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10`
      );
      const photosResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );

      const postsWithThumbnails = postsResponse.data.map((post) => {
        const relatedImage = photosResponse.data.find(
          (photo) => photo.id === post.id
        );
        return {
          ...post,
          thumbnail: relatedImage ? relatedImage.thumbnailUrl : "",
        };
      });
      
      setItems((prevItems) => (pageNumber === 1 ? postsWithThumbnails : [...prevItems, ...postsWithThumbnails]));
    } catch (error) {
      setError(t('error'));
      Alert.alert(t('error'), "There was an issue loading the data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchItems(1);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { itemId: item.id })}
        style={styles.card}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          {item.thumbnail && item.thumbnail !== "" && (
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title || t('noTitle')}</Text>
            <Text style={styles.body}>{item.body ? item.body.slice(0, 100) : t('noDescription')}...</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}> 
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          ) : null
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings-outline" size={28} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  body: {
    fontSize: 14,
    color: "#666",
  },
  loader: {
    paddingVertical: 20,
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default ListingPage;
