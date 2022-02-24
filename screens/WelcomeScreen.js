import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>דווחו על מטרד בדרך</Text>
        <View style={styles.chevrons}>
          <Ionicons name="chevron-down" size={32} color="#BB0101" />
          <Ionicons name="chevron-down" size={32} color="#BB0101" style={{ marginTop: -15 }} />
        </View>
      </View>
      <TouchableOpacity style={styles.button}></TouchableOpacity>
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
    marginTop: 10,
  },
  button: {
    backgroundColor: "#BB0101",
    borderRadius: 100,
    width: 180,
    height: 180,
    borderWidth: 30,
    borderColor: "#D67575",
  },
});
