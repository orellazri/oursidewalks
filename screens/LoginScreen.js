import { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
