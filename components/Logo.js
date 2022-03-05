import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return <Image source={require("../assets/images/logo.png")} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    right: 20,
    width: 150,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginLeft: 40,
    marginTop: 10,
  },
});
