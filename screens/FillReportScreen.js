import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { useReport } from "../utils/ReportContext";
import { Feather } from "@expo/vector-icons";

export default function FillReportScreen() {
  const { hazardType } = useReport();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>תיאור המפגע</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{hazardType.title}</Text>
        <Feather name="check" size={24} color="black" style={styles.checkIcon} />
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
    width: "70%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    textAlign: "left",
    fontSize: 17,
    fontFamily: "Assistant-Bold",
  },
});
