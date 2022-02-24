import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen({ navigation }) {
  const handlePressButton = () => {
    navigation.navigate("PromptCapture");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>דווחו על מטרד בדרך</Text>
        <View style={styles.chevrons}>
          <Ionicons name="chevron-down" size={32} color="#BB0101" />
          <Ionicons name="chevron-down" size={32} color="#BB0101" style={{ marginTop: -15 }} />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handlePressButton}></TouchableOpacity>

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
  titleContainer: {
    position: "absolute",
    top: 190,
  },
  title: {
    fontSize: 20,
    fontFamily: "Assistant-Bold",
  },
  chevrons: {
    alignSelf: "center",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#BB0101",
    borderRadius: 100,
    width: 200,
    height: 200,
    borderWidth: 30,
    borderColor: "#D67575",
  },
});
