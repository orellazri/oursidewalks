import { useState } from "react";
import { View, SafeAreaView, StyleSheet, Keyboard } from "react-native";
import Toast from "react-native-root-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setItemAsync } from "expo-secure-store";

import { auth } from "../utils/firebase";
import { colors } from "../utils/data";
import ContinueButton from "../components/ContinueButton";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import Title from "../components/Title";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();

      // Log in
      const credentials = await signInWithEmailAndPassword(auth, email, password);

      // Set user in persistent storage
      await setItemAsync("user", credentials["user"]["uid"]);

      navigation.navigate("Welcome");
    } catch (e) {
      let errorMessage = "התתחברות נכשלה";
      if (e.code == "auth/wrong-password") {
        errorMessage = "ההתחברות נכשלה. אחד מהפרטים שהזנת לא נכונים";
      }
      Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
        shadow: false,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <BackButton navigation={navigation} />

      {/* Title */}
      <Title text="התחברות" />

      {/* Form */}
      <View style={styles.form}>
        <TextInput label="כתובת אימייל" value={email} onChangeText={setEmail} keyboardType="email-address" autoComplete="email" />
        <TextInput label="סיסמה" value={password} onChangeText={setPassword} secureTextEntry={true} />
      </View>

      {/* Continue Button */}
      <ContinueButton onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  form: {
    width: "80%",
    marginTop: "6%",
  },
});
