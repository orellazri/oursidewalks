import { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../utils/firebase";
import ContinueButton from "../components/ContinueButton";
import { useReport } from "../utils/ReportContext";

export default function ChooseHazardType({ navigation }) {
  const [hazardTypes, setHazardTypes] = useState([]);
  const [chosenId, setChosenId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setHazardType } = useReport();

  useEffect(async () => {
    // Get hazard types from Firestore
    const querySnapshot = await getDocs(collection(db, "hazard-types"));
    let items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, title: doc.data().title, order: doc.data().order });
    });

    // Sort by order
    items.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0));
    setHazardTypes(items);
    setLoading(false);
  }, []);

  const handleChoose = (id) => {
    setChosenId(id);
    setHazardType(hazardTypes.filter((item) => item.id == id)[0]);
  };

  const handleContinue = () => {
    if (!chosenId) return;
    navigation.navigate("ChooseLocation");
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>סוג המפגע</Text>

      {/* Hazard Type List */}
      <FlatList
        style={styles.list}
        data={hazardTypes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.buttonContainer, item.id == chosenId ? styles.chosenButtonContainer : ""]}
            onPress={() => handleChoose(item.id)}
          >
            <Text style={[styles.buttonText, item.id == chosenId ? styles.chosenButtonText : ""]}>{item.title}</Text>
            {item.id == chosenId && <Feather name="check" size={24} color="white" />}
          </TouchableOpacity>
        )}
      />

      {/* Continue Button */}
      <ContinueButton onPress={handleContinue} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  list: {
    width: "70%",
    marginTop: 20,
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    borderRadius: 7,
    elevation: 4,
    shadowColor: "#777",
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  buttonText: {
    textAlign: "left",
    fontSize: 16,
    fontFamily: "Assistant-Bold",
    color: "#BB0101",
  },
  chosenButtonContainer: {
    backgroundColor: "#BB0101",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chosenButtonText: {
    color: "white",
  },
});
