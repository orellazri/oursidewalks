import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MenuItem({ text, page, navigation, last, setMenuOpen }) {
  const handlePress = () => {
    // Navigate to a page and close the menu after a delay
    // so it won't be seen in the transition
    navigation.navigate(page);
    setTimeout(() => {
      setMenuOpen(false);
    }, 500);
  };

  return (
    <TouchableOpacity style={[styles.container, !last ? styles.withLine : null]} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingVertical: 20,
  },
  withLine: {
    borderBottomColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    alignSelf: "flex-start",
  },
});
