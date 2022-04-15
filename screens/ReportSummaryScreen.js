import { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, Image, useWindowDimensions, View, ActivityIndicator } from "react-native";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import uuid from "react-native-uuid";

import { storage, db } from "../utils/firebase";
import { useReport } from "../utils/ReportContext";
import SummaryRow from "../components/SummaryRow";
import ContinueButton from "../components/ContinueButton";
import BackButton from "../components/BackButton";

export default function ReportSummaryScreen({ navigation }) {
  const { photos, hazardType, freetext } = useReport();

  const [truncatedFreetext, setTruncatedFreetext] = useState("");
  const [loading, setLoading] = useState(false);

  const window = useWindowDimensions();

  useEffect(() => {
    if (freetext.length == 0) {
      setTruncatedFreetext("לא הוזן טקסט חופשי");
    } else if (freetext.length > 30) {
      setTruncatedFreetext(freetext.substring(0, 30) + "...");
    } else {
      setTruncatedFreetext(freetext);
    }
  }, [freetext]);

  const handleSend = async () => {
    setLoading(true);

    let photoNames = [];

    const date = new Date();
    const today = date.toLocaleDateString("en-IL").replaceAll("/", "-");
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Upload photos
    for (let photo of photos) {
      // Resize and compress image
      const manipResult = await manipulateAsync(photo.uri, [{ resize: { height: 800 } }], {
        compress: 0.6,
        format: SaveFormat.JPEG,
      });

      // Fetch bytes
      const img = await fetch(manipResult.uri);
      const bytes = await img.blob();

      // Generate unique name, and append todays's date, hour, minute
      const name = uuid.v4() + "-" + today + "-" + hours + "-" + minutes;

      // Upload photo
      const storageRef = ref(storage, name);
      await uploadBytes(storageRef, bytes);

      photoNames.push(name);
    }

    // Add report to database
    await addDoc(collection(db, "reports"), {
      photos: photoNames,
      type: hazardType.id,
      freetext,
      created_at: Timestamp.now(),
    });

    // Navigate to report confirmation screen
    navigation.navigate("ReportConfirmation");
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
      {/* Back Button */}
      <BackButton />

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
