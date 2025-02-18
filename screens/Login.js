import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth method for login
import { auth } from "../firebaseConfig"; // Import Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage for storing user data
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons for eye icon on password field
import { useTranslation } from "react-i18next"; // Import useTranslation hook for multi-language support

const Login = ({ navigation }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook for i18n
  const [email, setEmail] = useState(""); // State to hold the email entered by the user
  const [password, setPassword] = useState(""); // State to hold the password entered by the user
  const [secureText, setSecureText] = useState(true); // State to toggle password visibility

  // Function to validate the email format
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Handle user login using Firebase Authentication
  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert(t("error"), "Please enter a valid email.");
      return;
    }

    try {
      // Attempt to sign in with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("user", email);
      navigation.replace("Listing");
    } catch (error) {
      // Handle different Firebase errors
      if (error.code === "auth/wrong-password") {
        Alert.alert(t("error"), "Incorrect password.");
      } else if (error.code === "auth/user-not-found") {
        Alert.alert(t("error"), "No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert(t("error"), "Invalid email address.");
      } else {
        Alert.alert(t("error"), error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("welcome")}</Text>
      <Text style={styles.subtitle}>{t("login")}</Text>

      {/* Email input field */}
      <TextInput
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password input field with eye icon for visibility toggle */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder={t("password")}
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>

      {/* Register button to navigate to the registration screen */}
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={[styles.buttonText, styles.registerButtonText]}>
          {t("register")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the Login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#E0E0E0",
  },
  registerButtonText: {
    color: "#333",
  },
});

export default Login;
