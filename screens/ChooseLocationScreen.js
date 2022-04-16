import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

import { useReport } from "../utils/ReportContext";
import ContinueButton from "../components/ContinueButton";
import BackButton from "../components/BackButton";

export default function ChooseLocationScreen({ navigation }) {
  const { location, setLocation } = useReport();
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
    setLocationText("");
  };

  const handleContinue = () => {
    navigation.navigate("FillReport");
  };

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
      {/* Back Button */}
      <BackButton navigation={navigation} />

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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "90%",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#777",
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  locationInput: {
    paddingLeft: 8,
    fontSize: 16,
  },
  closeIcon: {
    position: "absolute",
    right: 10,
  },
  continueButton: {
    position: "absolute",
    zIndex: 2,
    bottom: "3%",
  },
});
