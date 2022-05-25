import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton({ navigation, screen }) {
  const handlePress = () => {
    if (screen) {
      // If a screen was given, navigate to it
      navigation.navigate(screen);
    } else {
      // Go back by default if no screen was given
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Ionicons name="arrow-forward-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 2,
    position: "absolute",
    top: "5%",
    left: "5%",
  },
});
