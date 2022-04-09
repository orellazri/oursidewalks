import { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, Image, useWindowDimensions, View } from "react-native";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";

import { useReport } from "../utils/ReportContext";
import SummaryRow from "../components/SummaryRow";
import ContinueButton from "../components/ContinueButton";

export default function ReportSummaryScreen({ navigation }) {
  const { photos, hazardType, freetext } = useReport();

  const [truncatedFreetext, setTruncatedFreetext] = useState("");

  const window = useWindowDimensions();

  useEffect(() => {
    if (freetext.length > 30) {
      setTruncatedFreetext(freetext.substring(0, 30) + "...");
    } else {
      setTruncatedFreetext(freetext);
    }
  }, [freetext]);

  const handleSend = () => {
    navigation.navigate("ReportConfirmation");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>סיכום הדיווח שלך</Text>

      {/* Photos */}
      <FlatList
        horizontal
        data={photos}
        renderItem={({ item }) => <Image source={item} style={styles.photo(window)} />}
        keyExtractor={(photo) => photo.uri}
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
      />

      {/* Summary */}
      <View style={styles.summaryList}>
        <SummaryRow text="מיקום זמני" icon={<EvilIcons name="location" size={36} color="#BDBDBD" />} />
        <SummaryRow text={hazardType.title} icon={<EvilIcons name="question" size={36} color="#BDBDBD" />} />
        <SummaryRow text={truncatedFreetext} icon={<SimpleLineIcons name="note" size={26} color="#BDBDBD" />} />
      </View>

      {/* Buttons */}
      <View>
        <ContinueButton text="שליחה" onPress={handleSend} />
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
    marginTop: "10%",
  },
  photo: (window) => ({
    aspectRatio: 1,
    width: window.width / 1.5,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 15,
  }),
  summaryList: {
    width: "80%",
  },
});
