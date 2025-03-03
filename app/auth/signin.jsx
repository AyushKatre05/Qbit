import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator, // Import loader
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import { doc, getDoc } from "firebase/firestore";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show("Please enter email and password!", ToastAndroid.SHORT);
      return;
    }

    setLoading(true); // Start loading

    try {
      const resp = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const user = resp.user;
      console.log("User Logged In:", user);
      await getUserDetail(user);
    } catch (error) {
      console.error("Signin Error:", error);
      ToastAndroid.show("Signin Error", ToastAndroid.LONG);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getUserDetail = async (user) => {
    try {
      const result = await getDoc(doc(db, "users", user.email)); // Kept original email-based lookup
      if (result.exists()) {
        const data = result.data();
        console.log("User Detail:", data);
        setUserDetail(data);
        ToastAndroid.show("Welcome back, " + data.name, ToastAndroid.SHORT);
        router.replace("/(tabs)/home"); // Navigate after successful login
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onSignIn} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loader while signing in
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 15,
    color: "#007bff",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 15,
    color: "#007bff",
  },
});

export default Signin;
