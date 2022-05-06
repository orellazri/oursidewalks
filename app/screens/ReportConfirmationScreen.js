import { StyleSheet, View, Text } from "react-native";

import Logo from "../components/Logo";
import { colors } from "../utils/data";

export default function ReportConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.bottom}></View>

      {/* Logo */}
      <Logo />

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>הדיווח התקבל!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    alignItems: "center",
    paddingTop: "5%",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.red,
    width: "100%",
    height: "50%",
  },
  textContainer: {
    position: "absolute",
    bottom: "40%",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    color: "white",
  },
});