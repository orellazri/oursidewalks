import { View, Text, StyleSheet } from "react-native";

export default function Title(props) {
  let style = props.style ? [styles.title, props.style] : styles.title;

  return (
    <View style={styles.titleContainer}>
      <Text style={style}>{props.text}</Text>
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
