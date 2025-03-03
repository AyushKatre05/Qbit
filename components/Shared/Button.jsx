import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";

const Button = ({ text, type = "fill", onPress, loading }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: type === "fill" ? Colors.BLUE : "transparent",
        padding: 15,
        borderRadius: 15,
        marginTop: 15,
        width: "100%",
        borderWidth: type === "outline" ? 1 : 0,
        borderColor: Colors.BLUE,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: loading ? 0.7 : 1, // Slightly faded when loading
      }}
      onPress={!loading ? onPress : null} // Disable click when loading
      disabled={loading}
    >
      {loading ? (
        <>
          <ActivityIndicator size="large" color={Colors.BLUE}/>
          <Text style={{ color: Colors.BLUE, marginLeft: 10 }}>Loading...</Text>
        </>
      ) : (
        <Text style={{ textAlign: "center", color: type === "fill" ? "white" : Colors.BLUE }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
