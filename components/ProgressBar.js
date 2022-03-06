import { View, StyleSheet } from "react-native";

export default function ProgressBar({ percent }) {
  return (
    <View style={styles.progressBar}>
      <View style={styles.fill(percent)}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "white",
    top: 0,
    zIndex: 10,
  },
  fill: (percent) => ({
    flex: 1,
    width: percent,
    backgroundColor: "#bb0000",
  }),
});
