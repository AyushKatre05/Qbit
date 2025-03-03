import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "./../constant/Colors";

export default function Index() {
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
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </View>
        <View style={[styles.button , {borderWidth:1, backgroundColor:Colors.BLUE, borderColor:Colors.WHITE}]}>
          <Text style={[styles.buttonText, {color: Colors.WHITE} ]}>Already Have an Account</Text>
        </View>
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