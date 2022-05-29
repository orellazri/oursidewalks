import { useState, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, BackHandler } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { setItemAsync } from "expo-secure-store";
import * as Linking from "expo-linking";
import { doc, getDoc } from "firebase/firestore";

import { db, auth } from "../utils/firebase";
import { colors } from "../utils/data.js";
import { useReport } from "../utils/ReportContext";
import Header from "../components/Header.js";
import MenuItem from "../components/MenuItem.js";

export default function WelcomeScreen({ navigation }) {
  const { uid, setUid, user } = useReport();

  const [menuOpen, setMenuOpen] = useState(false);
  const [generateReportURL, setGenerateReportURL] = useState("");

  const window = useWindowDimensions();

  const handleLogout = () => {
    setMenuOpen(false);
    signOut(auth).then(async () => {
      setUid("");
      await setItemAsync("uid", "");
    });
  };

  const handlePressButton = () => {
    navigation.navigate("ChooseHazardType");
  };

  const handleTerms = () => {
    navigation.navigate("Terms");
  };

  const handleGenerateReport = () => {
    Linking.openURL(generateReportURL);
  };

  // Get generate report url meta
  useEffect(async () => {
    const docSnapshot = await getDoc(doc(db, "meta", "generate-report-url"));
    if (docSnapshot.exists()) {
      setGenerateReportURL(docSnapshot.data().value);
    }
  }, []);

  // Back button on Android closes menu
  useEffect(() => {
    const backAction = () => {
      if (menuOpen) {
        setMenuOpen(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [menuOpen]);

  // Menu
  if (menuOpen) {
    let menuContent;

    if (uid) {
      // User menu
      menuContent = (
        <View style={{ paddingTop: "5%" }}>
          <Text style={{ fontSize: 17 }}>ברוך הבא, {user.full_name}</Text>

          {/* Admin options */}
          {user.admin && (
            <MenuItem text="ייצור דוח" onPress={handleGenerateReport}>
              ייצור דור
            </MenuItem>
          )}
          <MenuItem text="התנתקות" onPress={handleLogout} last />
        </View>
      );
    } else {
      // Guest menu
      menuContent = (
        <View>
          <MenuItem text="הרשמה" page="Register" navigation={navigation} setMenuOpen={setMenuOpen} />
          <MenuItem text="התחברות" page="Login" navigation={navigation} setMenuOpen={setMenuOpen} last />
        </View>
      );
    }

    return (
      // Menu
      <SafeAreaView style={styles.menuContainer}>
        <View style={styles.menuContentContainer}>
          <TouchableOpacity style={styles.menuCloseIcon} onPress={() => setMenuOpen(false)}>
            <AntDesign name="close" size={26} color="black" />
          </TouchableOpacity>

          {/* Menu content */}
          {menuContent}
        </View>

        {/* Terms button */}
        <TouchableOpacity style={styles.termsContainer} onPress={handleTerms}>
          <Text style={styles.termsText}>תנאי שימוש</Text>
        </TouchableOpacity>

        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.triangle(window)}></View>

      {/* Header */}
      <Header navigation={navigation} setMenuOpen={setMenuOpen} />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>דווחו על מטרד בדרך</Text>
        <View style={styles.chevrons}>
          <Ionicons name="chevron-down" size={32} color={colors.red} />
          <Ionicons name="chevron-down" size={32} color={colors.red} style={{ marginTop: -15 }} />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePressButton}>
          <Image source={require("../assets/images/start-button.png")} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>

      {/* Status Bar */}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  triangle: (window) => ({
    width: 0,
    height: 0,
    position: "absolute",
    top: 0,
    borderLeftWidth: window.width,
    borderRightWidth: window.width,
    borderTopWidth: window.height / 2,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.yellow,
  }),
  titleContainer: {
    marginTop: "10%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Assistant-Bold",
  },
  chevrons: {
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 260,
    height: 260,
    resizeMode: "contain",
    alignSelf: "center",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.yellow,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: "15%",
  },
  menuCloseIcon: {
    marginLeft: "-4%",
  },
  menuContentContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginHorizontal: "10%",
    marginVertical: "14%",
  },
  termsContainer: {
    marginBottom: "10%",
    marginHorizontal: "10%",
  },
  termsText: {
    fontSize: 17,
  },
});
