import { useState } from "react";
import { Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ChooseHazardType() {
  const [chosenId, setChosenId] = useState(null);

  const types = [
    { id: 1, title: "חניה על המדרכה" },
    { id: 2, title: "פחים" },
    { id: 3, title: "בור או שיבוש במדרכה" },
  ];

  const handleChoose = (id) => {
    setChosenId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>סוג המפגע</Text>
      <FlatList
        style={styles.list}
        data={types}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.buttonContainer, item.id == chosenId ? styles.chosenButtonContainer : ""]}
            onPress={() => handleChoose(item.id)}
          >
            <Text style={[styles.buttonText, item.id == chosenId ? styles.chosenButtonText : ""]}>{item.title}</Text>
            {item.id == chosenId && <Feather name="check" size={24} color="white" style={styles.checkIcon} />}
          </TouchableOpacity>
        )}
      />
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
    fontSize: 18,
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
  checkIcon: {},
});
