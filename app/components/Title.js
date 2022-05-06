import { View, Text, StyleSheet } from "react-native";

export default function Title({ text }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: "10%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Assistant-Bold",
  },
});
