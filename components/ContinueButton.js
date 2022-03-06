import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ContinueButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.continueButton} onPress={onPress}>
      <Text style={styles.continueButtonText}>המשך</Text>
      <AntDesign name="arrowleft" size={20} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: "#FFCB39",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: "5%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  continueButtonText: {
    fontFamily: "Assistant-Bold",
    fontSize: 18,
    marginRight: 10,
  },
});
