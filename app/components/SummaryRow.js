import { View, Text, StyleSheet } from "react-native";

export default function SummaryRow({ text, icon }) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 17,
    marginLeft: 8,
    textAlign: "left",
  },
});
