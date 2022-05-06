import { View, Text, TextInput as TI, StyleSheet } from "react-native";

export default function TextInput(props) {
  return (
    <View style={styles.inputContainer}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TI style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 15,
  },
  label: {
    fontFamily: "Assistant-Bold",
    fontSize: 17,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: "right",
  },
});
