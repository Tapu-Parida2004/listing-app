import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Settings = ({ navigation }) => {
  // Access translation functions and i18n instance
  const { t, i18n } = useTranslation();

  // Function to change the app's language
  const changeLanguage = async (lng) => {
    await i18n.changeLanguage(lng); // Change language using i18n
  };
  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user"); // Clear session
      navigation.replace("Login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Settings screen title */}
      <Text style={styles.title}>{t("Settings")}</Text>

      {/* Language selection section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("Language")}</Text>
        <View style={styles.buttonRow}>
          {/* Button to switch to English */}
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage("en")}
          >
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>
          {/* Button to switch to Spanish */}
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage("es")}
          >
            <Text style={styles.languageText}>Español</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Back and Logout buttons section */}

      <View style={styles.section}>
        {/* Button to navigate back to the previous screen */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>{t("Back")}</Text>
        </TouchableOpacity>

        {/* Button to log out the user */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t("Logout")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the Settings component
const styles = StyleSheet.create({
  // Main container styling
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
  },
  // Title styling
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  // Section styling
  section: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  // Row of buttons styling
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  // Language button styling
  languageButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  // Language button text styling
  languageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Back button styling
  backButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  // Logout button styling
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  // Button text styling
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Logout button text styling
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
