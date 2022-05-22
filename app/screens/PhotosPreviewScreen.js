import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, useWindowDimensions } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";

import { useReport } from "../utils/ReportContext";
import ContinueButton from "../components/ContinueButton";
import { colors } from "../utils/data";

export default function PhotosPreviewScreen({ navigation }) {
  const { photos, setPhotos, resetReport } = useReport();

  const window = useWindowDimensions();

  const handleClose = () => {
    navigation.navigate("PromptCapture");
    resetReport();
  };

  const openCamera = () => {
    if (photos.length == 3) {
      Toast.show("אין אפשרות להוסיף יותר מ-3 תמונות", {
        duration: Toast.durations.LONG,
        shadow: false,
      });
      return;
    }
    navigation.push("CameraCapture");
  };

  const openGallery = async () => {
    if (photos.length == 3) {
      let toast = Toast.show("אין אפשרות להוסיף יותר מ-3 תמונות", {
        duration: Toast.durations.LONG,
      });
      return;
    }

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

  const removePhoto = (photo) => {
    setPhotos(photos.filter((item) => item != photo));
  };

  const handleContinue = () => {
    navigation.navigate("ChooseLocation");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <AntDesign name="close" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>בחירת תמונות</Text>
        {/* Placeholder to align title to center */}
        <View></View>
      </View>

      {/* Photos */}
      <FlatList
        horizontal
        data={photos}
        renderItem={({ item, index }) => (
          <View style={styles.photoContainer(window)}>
            <TouchableOpacity
              style={styles.photoRemoveIcon}
              onPress={() => {
                removePhoto(item);
              }}
            >
              <Ionicons name="md-trash" size={22} color="white" />
            </TouchableOpacity>
            <Image source={item} style={styles.photo} />
          </View>
        )}
        keyExtractor={(photo) => photo.uri}
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
      />

      {/* Buttons */}
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <AntDesign name="camerao" size={43} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>מצלמה</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <FontAwesome name="photo" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>גלריה</Text>
        </View>
      </View>

      {/* Continue Button */}
      <ContinueButton onPress={handleContinue} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  titleContainer: {
    marginTop: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    marginRight: "15%",
  },
  closeButton: {
    marginLeft: 30,
  },
  list: {
    marginTop: 30,
  },
  photoContainer: (window) => ({
    aspectRatio: 3 / 5,
    width: window.width / 1.6,
    marginHorizontal: 10,
    position: "relative",
  }),
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  photoRemoveIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 50,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: "2%",
  },
  button: {
    backgroundColor: colors.red,
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    marginTop: 10,
  },
});
