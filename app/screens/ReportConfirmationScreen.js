import { StyleSheet, View, Text, TouchableOpacity, Share, Image, useWindowDimensions } from "react-native";

import Logo from "../components/Logo";
import { colors } from "../utils/data";
import { useReport } from "../utils/ReportContext";

export default function ReportConfirmationScreen({ navigation }) {
  const window = useWindowDimensions();

  const { resetReport } = useReport();

  const handleBackButton = () => {
    navigation.navigate("Welcome");
    resetReport();
  };

  const handleShareButton = async () => {
    try {
      const result = await Share.share({
        message: "גם אני דיווחתי דרך אפליקציית ברחובות שלנו!",
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <Image source={require("../assets/images/confirmation-bg.png")} style={styles.background(window)} />

      {/* Logo */}
      <Logo />

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>הדיווח התקבל!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
          <Text style={styles.backButtonText}>עשיתי את שלי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShareButton}>
          <Text style={styles.shareButtonText}>שיתוף הדיווח</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    alignItems: "center",
    paddingTop: "5%",
  },
  background: (window) => ({
    position: "absolute",
    top: 0,
    resizeMode: "contain",
    height: window.height,
  }),
  textContainer: {
    marginTop: "90%",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 22,
    color: "white",
  },
  buttonsContainer: {
    marginTop: "50%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
  shareButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  shareButtonText: {
    fontSize: 18,
  },
});
