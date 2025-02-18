import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Register = ({ navigation }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  // Function to validate email using regex
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Function to validate password with minimum length, one uppercase, and one digit
  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  // Function to handle user registration
  const handleRegister = async () => {
    // Validate email format
    if (!isValidEmail(email)) {
      Alert.alert(t("error"), t("invalidEmail")); // Use translations
      return;
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      Alert.alert(t("error"), t("invalidPassword")); // Use translations
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert(t("error"), t("passwordMismatch")); // Use translations
      return;
    }

    try {
      // Create user with email and password in Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert(t("success"), t("accountCreated")); // Use translations
      navigation.navigate("Login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(t("error"), t("emailInUse")); // Use translations
      } else if (error.code === "auth/invalid-email") {
        Alert.alert(t("error"), t("invalidEmailFormat")); // Use translations
      } else {
        Alert.alert(t("error"), error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("createAccount")}</Text>
      <Text style={styles.subtitle}>{t("joinUs")}</Text>

      <TextInput
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

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
      {/* Confirm password container */}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder={t("confirmPassword")}
          secureTextEntry={secureConfirmText}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setSecureConfirmText(!secureConfirmText)}
        >
          <Ionicons
            name={secureConfirmText ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Register button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{t("register")}</Text>
      </TouchableOpacity>

      {/* Navigate back to login screen */}
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={[styles.buttonText, styles.loginButtonText]}>
          {t("backToLogin")} {/* Display translated text for back to login */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginBottom: 15,
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
  loginButton: {
    backgroundColor: "#E0E0E0",
  },
  loginButtonText: {
    color: "#333",
  },
});

export default Register;
