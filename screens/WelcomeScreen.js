import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen({ navigation }) {
  const handlePressButton = () => {
    navigation.navigate("PromptCapture");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.triangle}></View>

      {/* Logo */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>דווחו על מטרד בדרך</Text>
        <View style={styles.chevrons}>
          <Ionicons name="chevron-down" size={32} color="#BB0101" />
          <Ionicons name="chevron-down" size={32} color="#BB0101" style={{ marginTop: -15 }} />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handlePressButton}>
        <Image source={require("../assets/images/start-button.png")} style={styles.buttonImage} />
      </TouchableOpacity>

      {/* Status Bar */}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    alignItems: "center",
  },
  triangle: {
    width: 0,
    height: 0,
    position: "absolute",
    top: 0,
    borderLeftWidth: 500,
    borderRightWidth: 500,
    borderTopWidth: 450,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFCB39",
  },
  logo: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 150,
    resizeMode: "contain",
  },
  titleContainer: {
    position: "absolute",
    top: 210,
  },
  title: {
    fontSize: 20,
    fontFamily: "Assistant-Bold",
  },
  chevrons: {
    alignSelf: "center",
    marginTop: 7,
  },
  button: {},
  buttonImage: {
    width: 230,
    height: 230,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
