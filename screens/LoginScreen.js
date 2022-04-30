import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setItemAsync } from "expo-secure-store";

import { auth } from "../utils/firebase";
import ContinueButton from "../components/ContinueButton";
import TextInput from "../components/TextInput";
import Title from "../components/Title";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("ryiseld@gmail.com");
  const [password, setPassword] = useState("password");

  const handleSubmit = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
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
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
    marginTop: "6%",
  },
});
