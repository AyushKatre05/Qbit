import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "../../context/UserDetailContext";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin : 10,
        padding : 10
      }}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Hi, {userDetail?.name}
        </Text>
        <Text style={{ fontSize: 16, color: "gray" }}>
          Lets get started with your day!
        </Text>
      </View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
    </View>
  );
};

export default Header;
