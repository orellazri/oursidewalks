import { SafeAreaView, Text, StyleSheet, View, TextInput } from "react-native";
import { useReport } from "../utils/ReportContext";
import { Feather } from "@expo/vector-icons";
import ContinueButton from "../components/ContinueButton";

export default function FillReportScreen() {
  const { hazardType } = useReport();

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>תיאור המפגע</Text>

      {/* Hazard Type */}
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{hazardType.title}</Text>
        <Feather name="check" size={24} color="black" style={styles.checkIcon} />
      </View>

      {/* Form */}
      <Text style={styles.formInputLabel}>תיאור המפגע</Text>
      <TextInput style={styles.formInput} multiline placeholder="טקסט חופשי (אופציונלי)..." />

      {/* Continue Button */}
      <View style={styles.continueButton}>
        <ContinueButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
    elevation: 4,
    shadowColor: "#777",
    shadowRadius: 2,
    shadowOpacity: 0.2,
    width: "80%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    textAlign: "left",
    fontSize: 17,
    fontFamily: "Assistant-Bold",
  },
  formInputLabel: {
    marginTop: 30,
    textAlign: "left",
    width: "80%",
    fontSize: 17,
    fontFamily: "Assistant-Bold",
  },
  formInput: {
    width: "80%",
    height: "30%",
    backgroundColor: "white",
    marginTop: 10,
    paddingTop: 15,
    paddingHorizontal: 15,
    borderRadius: 7,
    textAlign: "right",
    fontSize: 16,
  },
  continueButton: {
    marginTop: "auto",
  },
});
