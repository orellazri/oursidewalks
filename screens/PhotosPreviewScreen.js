import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    aspectRatio: 3 / 4,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
