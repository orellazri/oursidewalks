import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { usePhotos } from "../utils/PhotosContext";

export default function CameraCaptureScreen({ navigation }) {
  const { photos, setPhotos } = usePhotos();

  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const camera = useRef(null);

  const { width, height } = Dimensions.get("window");
  const screenRatio = height / width;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (camera == null) return;
    const photo = await camera.current.takePictureAsync();
    setPhoto(photo);
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const confirmPhoto = () => {
    setPhotos([...photos, photo]);
    navigation.navigate("PhotosPreview");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>אין לאפליקציה גישה למצלמה. אנא אפשרו גישה דרך הגדרות המכשיר.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!photo && (
        <Camera style={{ width: "100%", height: "80%" }} ref={camera}>
          <View style={styles.singleButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <AntDesign name="camerao" size={50} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {photo && (
        <View>
          <Image source={photo} style={{ width: "100%", height: "100%" }}></Image>
          <View style={styles.twoButtonsContainer}>
            <TouchableOpacity style={styles.button} onPress={retakePhoto}>
              <MaterialCommunityIcons name="camera-retake-outline" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={confirmPhoto}>
              <Feather name="check" size={50} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  singleButtonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  twoButtonsContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    width: 90,
    height: 90,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.6)",
  },
});
