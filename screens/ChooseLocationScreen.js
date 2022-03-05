import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function ChooseLocationScreen() {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");

      let location = await Location.getCurrentPositionAsync({});
      setLocation({ ...location["coords"], latitudeDelta: 0.004, longitudeDelta: 0.004 });
    })();
  }, []);

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
      {location && <MapView style={styles.map} initialRegion={location} showsUserLocation={true} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
