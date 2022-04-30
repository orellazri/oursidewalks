import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import Logo from "../components/Logo.js";
import { colors } from "../utils/data.js";
import { color } from "../node_modules/react-native/Libraries/Components/View/ReactNativeStyleAttributes.js";

export default function WelcomeScreen({ navigation }) {
  const window = useWindowDimensions();

  const handlePressButton = () => {
    navigation.navigate("ChooseHazardType");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.triangle(window)}></View>

      {/* Logo */}
      <Logo />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>דווחו על מטרד בדרך</Text>
        <View style={styles.chevrons}>
          <Ionicons name="chevron-down" size={32} color={colors.red} />
          <Ionicons name="chevron-down" size={32} color={colors.red} style={{ marginTop: -15 }} />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePressButton}>
          <Image source={require("../assets/images/start-button.png")} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>

      {/* Status Bar */}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignItems: "center",
  },
  triangle: (window) => ({
    width: 0,
    height: 0,
    position: "absolute",
    top: 0,
    borderLeftWidth: window.width,
    borderRightWidth: window.width,
    borderTopWidth: window.height / 2,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.yellow,
  }),
  titleContainer: {
    marginTop: "15%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Assistant-Bold",
  },
  chevrons: {
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 230,
    height: 230,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
