import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (isLoading) return;

    if (!username || !password) {
      Alert.alert("Error", "Please fill in both username and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (username === "admin" && password === "admin123") {
        navigation.navigate("TransactionScreen");
      } else {
        Alert.alert("Error", "Invalid username or password.");
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>We Say Hello!</Text>
      <Text style={styles.subtitle}>
        Welcome back. Use your username and password to log in.
      </Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A3A3A3"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#A3A3A3"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.eyeIcon}>
            {isPasswordVisible ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.loginButton,
          { backgroundColor: isLoading ? "#A3A3A3" : "#C8FB00" },
        ]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.loginButtonText}>Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    color: "#7E7E7E",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    elevation: 3,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
  },
  eyeIcon: {
    fontSize: 18,
    color: "#A3A3A3",
    marginLeft: 10,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 30,
    color: "#7E7E7E",
    fontSize: 12,
  },
  loginButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
