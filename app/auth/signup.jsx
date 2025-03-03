import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth, db } from "../../config/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const createNewAccount = async () => {
    if (!fullName.trim() || !email.trim() || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const resp = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const user = resp.user;
      console.log("User Created:", user);
      await saveUser(user);
      Alert.alert("Success", "Account created successfully!");
      router.push("/auth/signin"); // Navigate to Sign In page
    } catch (error) {
      Alert.alert("Signup Error", error.message);
      console.error("Signup Error:", error);
    }
  };

  const saveUser = async (user) => {
    try {
      await setDoc(doc(db, "users", user.email), {
        name: fullName.trim(),
        email: user.email,
        member: false,
        uid: user.uid,
      });
      console.log("User saved to Firestore");
    } catch (error) {
      console.error("Firestore Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

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

      <TouchableOpacity style={styles.button} onPress={createNewAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signin")}>
        <Text style={styles.loginText}>Already have an account? Sign In</Text>
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
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 15,
    color: "#007bff",
  },
});

export default Signup;
