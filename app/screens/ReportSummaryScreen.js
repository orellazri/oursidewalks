import { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, Image, useWindowDimensions, View, ActivityIndicator } from "react-native";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, Timestamp, GeoPoint } from "firebase/firestore";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import uuid from "react-native-uuid";
// import Geocoder from "react-native-geocoding";

import { storage, db } from "../utils/firebase";
import { useReport } from "../utils/ReportContext";
import SummaryRow from "../components/SummaryRow";
import ContinueButton from "../components/ContinueButton";
import BackButton from "../components/BackButton";
import Title from "../components/Title";
import { colors } from "../utils/data";
// import { PLACES_API_KEY } from "../utils/keys";

export default function ReportSummaryScreen({ navigation }) {
  const { uid, photos, hazardType, freetext, location, consent, setConsent } = useReport();

  const [truncatedFreetext, setTruncatedFreetext] = useState("");
  const [locationText, setLocationText] = useState("");
  const [loading, setLoading] = useState(false);

  const window = useWindowDimensions();

  useEffect(() => {
    // Get location text with reverse geocoding
    // Geocoder.init(PLACES_API_KEY);
    // Geocoder.from(location.latitude, location.longitude).then((json) => {
    //   let address = json.results[0].formatted_address;
    //   if (address.length > 40) {
    //     setLocationText(address.substring(0, 40) + "...");
    //   } else {
    //     setLocationText(address);
    //   }
    // });

    if (freetext.length == 0) {
      setTruncatedFreetext("לא הוזן טקסט חופשי");
    } else if (freetext.length > 30) {
      setTruncatedFreetext(freetext.substring(0, 30) + "...");
    } else {
      setTruncatedFreetext(freetext);
    }
  }, [freetext]);

  const handleSend = async () => {
    // If for some reason there are more than 3 photos,
    // don't upload. We should not get to this point since this is
    // enforced in PhotosPreviewScreen
    if (photos.length > 3) {
      return;
    }

    setLoading(true);

    let photoNames = [];

    // Upload photos
    for (let photo of photos) {
      // Resize and compress image
      const manipResult = await manipulateAsync(photo.uri, [{ resize: { height: 1000 } }], {
        compress: 0.6,
        format: SaveFormat.JPEG,
      });

      // Fetch bytes
      const img = await fetch(manipResult.uri);
      const bytes = await img.blob();

      // Generate unique name using UUID v4
      const name = uuid.v4();

      // Upload photo
      const storageRef = ref(storage, name);
      await uploadBytes(storageRef, bytes);

      photoNames.push(name);
    }

    // Add report to database
    await addDoc(collection(db, "reports"), {
      photos: photoNames,
      hazard_type: hazardType.id,
      freetext,
      location: new GeoPoint(location.latitude, location.longitude),
      created_at: Timestamp.now(),
      user_id: uid,
      consent,
    });

    // Navigate to report confirmation screen
    navigation.navigate("ReportConfirmation");
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#aaa" />
        <Text style={styles.loadingText}>שולח דיווח...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <BackButton navigation={navigation} />

      {/* Title */}
      <Title text="סיכום הדיווח שלך" />

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
        {/* <SummaryRow text={locationText} icon={<EvilIcons name="location" size={36} color={colors.gray} />} /> */}
        <SummaryRow text={hazardType.title} icon={<EvilIcons name="question" size={36} color={colors.gray} />} />
        <SummaryRow text={truncatedFreetext} icon={<SimpleLineIcons name="note" size={26} color={colors.gray} />} />

        {/* Checkbox */}
        <BouncyCheckbox
          text="אני מסכים לשתף את הפרטים שלי"
          style={styles.checkbox}
          fillColor={colors.yellow}
          textStyle={{
            textDecorationLine: "none",
            color: "black",
          }}
          onPress={(isChecked) => {
            setConsent(isChecked);
          }}
        />
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
    backgroundColor: colors.background,
  },
  photo: (window) => ({
    aspectRatio: 3 / 5,
    width: window.width / 1.8,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 15,
  }),
  summaryList: {
    width: "80%",
    marginBottom: "10%",
  },
  checkbox: {
    marginTop: 30,
  },
  loadingText: {
    paddingTop: 20,
    fontSize: 16,
  },
});
