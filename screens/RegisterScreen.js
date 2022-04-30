import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../utils/firebase";
import ContinueButton from "../components/ContinueButton";
import TextInput from "../components/TextInput";
import Title from "../components/Title";

export default function LoginScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("ryiseld@gmail.com");
  const [password, setPassword] = useState("password");

  const handleSubmit = async () => {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);
    } catch (e) {
      let errorMessage = "ההרשמה נכשלה";
      if (e.code == "auth/email-already-in-use") {
        errorMessage = "כתובת האימייל שהזנת כבר נמצאת בשימוש";
      }

      Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Title text="הרשמה" />

      {/* Form */}
      <View style={styles.form}>
        <TextInput label="שם מלא" value={fullName} onChangeText={setFullName} />
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
