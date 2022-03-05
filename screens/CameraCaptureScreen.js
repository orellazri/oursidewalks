import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Platform } from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { usePhotos } from "../utils/PhotosContext";

export default function CameraCaptureScreen({ navigation }) {
  const { photos, setPhotos } = usePhotos();

  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [ratio, setRatio] = useState("4:3");
  const [imagePadding, setImagePadding] = useState(0);

  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Sets he camera ratio and padding
  const prepareRatio = async () => {
    let desiredRatio = "4:3";
    if (Platform.OS == "android") {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }

      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2);
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  const handleCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const takePhoto = async () => {
    if (camera == null) return;
    const photo = await camera.current.takePictureAsync();
    setPhoto(photo);
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const confirmPhoto = () => {
    setPhotos([photo, ...photos]);
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
      {/* Camera */}
      {!photo && (
        <Camera
          style={{ flex: 1, marginTop: imagePadding, marginBottom: imagePadding }}
          ref={camera}
          ratio={ratio}
          onCameraReady={handleCameraReady}
        >
          <View style={styles.singleButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <AntDesign name="camerao" size={50} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      {/* Photo preview */}
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
