import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Logo from "../components/Logo";
import { useReport } from "../utils/ReportContext";

export default function PromptCaptureScreen({ navigation }) {
  const { photos, setPhotos } = useReport();

  const openCamera = () => {
    navigation.navigate("CameraCapture");
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      asepct: [3, 4],
    });

    if (!result.cancelled) {
      setPhotos([result, ...photos]);
      navigation.navigate("PhotosPreview");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Logo />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>תעדו את המפגע</Text>
        <View style={styles.chevrons}>
          <Ionicons name="chevron-down" size={32} color="#FDD15A" />
          <Ionicons name="chevron-down" size={32} color="#FDD15A" style={{ marginTop: -15 }} />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <AntDesign name="camerao" size={65} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>מצלמה</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <FontAwesome name="photo" size={65} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>גלריה</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: "20%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Assistant-Bold",
  },
  chevrons: {
    alignSelf: "center",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "15%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BB0101",
    borderRadius: 100,
    width: 125,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    marginTop: 10,
  },
});
