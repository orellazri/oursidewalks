import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView, Text, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import { useReport } from "../utils/ReportContext";
import ContinueButton from "../components/ContinueButton";
import BackButton from "../components/BackButton";
import { Marker } from "react-native-maps";
import { PLACES_API_KEY } from "../utils/keys";

export default function ChooseLocationScreen({ navigation }) {
  const { location, setLocation } = useReport();
  const [hasPermission, setHasPermission] = useState(null);
  const [initialLocation, setInitialLocation] = useState({
    // Initial location of Israel
    longitude: 34.777787,
    latitude: 31.224496,
    longitudeDelta: 5,
    latitudeDelta: 5,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");

      let location = await Location.getCurrentPositionAsync({
        // Setting accuracy to low for loading times
        accuracy: Platform.OS === "android" ? Location.Accuracy.Low : Location.Accuracy.Lowest,
      });
      setLocation({ ...location["coords"], latitudeDelta: 0.004, longitudeDelta: 0.004 });
      setInitialLocation({ ...location["coords"], latitudeDelta: 0.004, longitudeDelta: 0.004 });
    })();
  }, []);

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
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            placeholder="הזן מיקום..."
            query={{ key: PLACES_API_KEY, language: "he", components: "country:il" }}
            styles={{
              textInput: { textAlign: "right", color: "black" },
            }}
            textInputProps={{
              placeholderTextColor: "#777",
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              const { lat: latitude, lng: longitude } = details.geometry.location;
              setLocation({ latitude, longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 });
              setInitialLocation({ latitude, longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 });
            }}
          />
        </View>
        <Text style={styles.searchTooltipText}>באפשרותך לגרור את הסמן למיקום מדויק</Text>
      </View>

      {/* Continue button */}
      <View style={styles.continueButton}>
        <ContinueButton onPress={handleContinue} />
      </View>

      {/* Map */}
      <MapView style={styles.map} initialRegion={initialLocation} region={initialLocation} provider={PROVIDER_GOOGLE}>
        {location && (
          <Marker
            coordinate={location}
            draggable
            onDragEnd={(e) => {
              setLocation(e.nativeEvent.coordinate);
            }}
          />
        )}
      </MapView>
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
  searchContainer: {
    position: "absolute",
    top: "10%",
    zIndex: 1,
    width: "90%",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#777",
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  searchTooltipText: {
    marginTop: 10,
    textShadowColor: "#eee",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
    color: "black",
    fontSize: 15,
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
