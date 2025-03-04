import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { useContext } from "react";
import { UserDetailContext } from "../context/UserDetailContext";
import { doc, getDoc } from "firebase/firestore";

export default function Index() {
  const router  = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  onAuthStateChanged(auth, async (user) => {  
    if (user) {
      console.log(user);
      const result = await getDoc(doc(db, "users", user?.email));
      if (result.exists()) {
        const data = result.data();
        setUserDetail(data);
        router.replace("/(tabs)/home");
      }
    }
  }
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image style={{
        width: 350,
        height: 250,
        borderRadius: 100,
        marginTop : 70,
      }} source={require("./../assets/images/images.jpeg")}></Image>
      <View
        style={{
          padding: 25,
          backgroundColor: Colors.BLUE,
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
    }}>
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >Welcome to Qbit</Text>
        <Text 
          style={{
            color: Colors.WHITE,
            fontSize: 20,
            textAlign: "center",
            marginTop: 20,
          }}>
          The App that helps you to manage your time and tasks efficiently
        </Text>
        <TouchableOpacity onPress={()=>router.push('/auth/signup')} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push('/auth/signin')} style={[styles.button , {borderWidth:1, backgroundColor:Colors.BLUE, borderColor:Colors.WHITE}]}>
          <Text style={[styles.buttonText, {color: Colors.WHITE} ]}>Already Have an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  button : {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 10,         
    width: "100%",
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText : {  
    color: Colors.BLUE,
    fontSize: 20,
    textAlign: 'center',
  }
});