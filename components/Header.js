import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Header() {
  const openMenu = () => {
    console.log("Open menu");
  };

  return (
    <View style={styles.container}>
      {/* Menu */}
      <TouchableOpacity onPress={openMenu}>
        <Feather style={styles.menuIcon} name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <Image style={styles.logo} source={require("../assets/images/logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "3%",
    zIndex: 1,
  },
  logo: {
    width: 150,
    resizeMode: "contain",
  },
  menuIcon: {},
});
