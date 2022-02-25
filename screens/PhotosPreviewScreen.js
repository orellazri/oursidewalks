import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { usePhotos } from "../utils/PhotosContext";
import { useEffect } from "react";

export default function PhotosPreviewScreen({ navigation }) {
  const { photos, setPhotos } = usePhotos();

  const handleClose = () => {
    navigation.navigate("PromptCapture");
    setPhotos([]);
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
        renderItem={({ item }) => <Image source={item} style={styles.photo} />}
        keyExtractor={(photo) => photo.uri}
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
      />

      {/* Buttons */}
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={{}}>
            <AntDesign name="camerao" size={43} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>מצלמה</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={{}}>
            <FontAwesome name="photo" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>גלריה</Text>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>המשך</Text>
        <AntDesign name="arrowleft" size={20} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 18,
    marginRight: 30,
  },
  closeButton: {
    marginLeft: 30,
  },
  list: {
    marginTop: 30,
  },
  photo: {
    aspectRatio: 3 / 5,
    width: 300,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 50,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BB0101",
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
  continueButton: {
    backgroundColor: "#FFCB39",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  continueButtonText: {
    fontFamily: "Assistant-Bold",
    fontSize: 18,
    marginRight: 10,
  },
});
