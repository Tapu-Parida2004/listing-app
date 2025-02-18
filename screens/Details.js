import React, { useState, useEffect } from "react"; // Importing necessary React hooks
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native"; // Importing components from React Native
import axios from "axios"; // Importing Axios for making HTTP requests
import { useTranslation } from "react-i18next"; // Import useTranslation for internationalization

const DetailsPage = ({ route, navigation }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const { itemId } = route.params; // Extract itemId from the route params
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch item details when the component is mounted
    const fetchItemDetails = async () => {
      try {
        // Make an HTTP GET request using Axios
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${itemId}`
        );
        setItemDetails(response.data);
      } catch (error) {
        // Handle any error during the fetch request
        setError(t("errorFetchingDetails")); // Use translations
        Alert.alert(t("error"), t("fetchDetailsFailed")); // Use translations
      } finally {
        setLoading(false);
      }
    };
    fetchItemDetails();
  }, [itemId]);

  if (loading) {
    // Render loading indicator while fetching item details
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (error) {
    // Render error message if there was an error during the fetch
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title={t("retry")} onPress={() => setLoading(true)} />
      </View>
    );
  }
  // Render item details once they are successfully fetched
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemDetails.title}</Text>
      {itemDetails.thumbnailUrl && (
        <Image
          source={{ uri: itemDetails.thumbnailUrl }}
          style={styles.image}
        />
      )}
      <Text style={styles.description}>{itemDetails.body}</Text>
      <Button
        title={t("goBack")}
        onPress={() => navigation.goBack()}
        color="#007AFF"
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#555555",
    lineHeight: 24,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    fontSize: 18,
    color: "#ff4d4d",
    marginBottom: 10,
  },
});

export default DetailsPage;//// Export the component as the default export
