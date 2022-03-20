import { SafeAreaView, Text, StyleSheet, FlatList, Image, useWindowDimensions } from "react-native";

import { useReport } from "../utils/ReportContext";

export default function ReportSummaryScreen({ navigation }) {
  const { photos, hazardType, freetext } = useReport();

  const window = useWindowDimensions();

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
  photo: (window) => ({
    aspectRatio: 1,
    width: window.width / 1.5,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 15,
  }),
});
