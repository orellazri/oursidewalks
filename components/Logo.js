import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return <Image source={require("../assets/images/logo.png")} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 150,
    resizeMode: "contain",
  },
});
