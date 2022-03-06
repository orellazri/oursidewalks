import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

import ProgressBar from "../components/ProgressBar";
import ContinueButton from "../components/ContinueButton";

export default function ChooseLocationScreen() {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [locationText, setLocationText] = useState("");

  const initialLocation = {
    longitude: 34.777787,
    latitude: 31.224496,
    longitudeDelta: 5,
    latitudeDelta: 5,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");

      let location = await Location.getCurrentPositionAsync({});
      setLocation({ ...location["coords"], latitudeDelta: 0.004, longitudeDelta: 0.004 });
    })();
  }, []);

  const clearLocationText = () => {
    console.log("Hi there");
    setLocationText("");
  };

  const handleContinue = () => {};

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>אין לאפליקציה גישה למיקום. אנא אפשרו גישה דרך הגדרות המכשיר.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <ProgressBar percent="25%" />

      {/* Location input */}
      <View style={styles.inputContainer}>
        <EvilIcons name="location" size={23} color="#777" styles={styles.searchIcon} />
        <TextInput style={styles.locationInput} placeholder="הזן מיקום..." value={locationText} onChangeText={setLocationText} />
        <TouchableOpacity style={styles.closeIcon} onPerss={clearLocationText}>
          <AntDesign name="close" size={23} color="black" />
        </TouchableOpacity>
      </View>

      {/* Continue button */}
      <View style={styles.continueButton}>
        <ContinueButton onPress={handleContinue} />
      </View>

      {/* Map */}
      <MapView style={styles.map} initialRegion={initialLocation} region={location} showsUserLocation={true}></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    zIndex: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: "10%",
    zIndex: 1,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    elevation: 4,
    shadowColor: "black",
    shadowRadius: 4,
  },
  locationInput: {
    paddingLeft: 8,
  },
  closeIcon: {
    position: "absolute",
    right: 10,
  },
  continueButton: {
    position: "absolute",
    zIndex: 2,
    bottom: "5%",
  },
});
