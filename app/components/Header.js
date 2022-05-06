import { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { setItemAsync } from "expo-secure-store";

import { auth } from "../utils/firebase";
import { colors } from "../utils/data";
import { useReport } from "../utils/ReportContext";
import MenuItem from "./MenuItem";

export default function Header({ navigation }) {
  const { user, setUser } = useReport();

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    // TODO: add animation
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    closeMenu();
    signOut(auth).then(async () => {
      setUser(null);
      await setItemAsync("user", "");
    });
  };

  return (
    <View style={styles.container}>
      {/* Menu Icon */}
      <TouchableOpacity onPress={openMenu}>
        <Feather style={styles.menuIcon} name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <Image style={styles.logo} source={require("../assets/images/logo.png")} />

      {/* Menu */}
      {menuOpen &&
        (user ? (
          // User menu
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuCloseIcon} onPress={closeMenu}>
              <AntDesign name="close" size={26} color="black" />
            </TouchableOpacity>

            <Text>ברוך הבא</Text>
            <MenuItem text="התנתקות" onPress={handleLogout} last />
          </View>
        ) : (
          // Guest menu
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuCloseIcon} onPress={closeMenu}>
              <AntDesign name="close" size={26} color="black" />
            </TouchableOpacity>

            <MenuItem text="הרשמה" page="Register" navigation={navigation} setMenuOpen={setMenuOpen} />
            <MenuItem text="התחברות" page="Login" navigation={navigation} setMenuOpen={setMenuOpen} last />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%",
    zIndex: 1,
  },
  logo: {
    width: 150,
    resizeMode: "contain",
  },
  menuIcon: {},
  menuContainer: {
    position: "absolute",
    backgroundColor: colors.yellow,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    top: 0,
    left: 0,
    alignItems: "flex-start",
    padding: "10%",
  },
  menuCloseIcon: {
    marginBottom: 10,
    marginLeft: "-5%",
    marginTop: "-2%",
  },
});
