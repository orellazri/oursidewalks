import { useState } from "react";
import { View, SafeAreaView, StyleSheet, Keyboard } from "react-native";
import Toast from "react-native-root-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { setItemAsync } from "expo-secure-store";

import { db, auth } from "../utils/firebase";
import ContinueButton from "../components/ContinueButton";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import { colors } from "../utils/data";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();

      // Sign up
      const credentials = await createUserWithEmailAndPassword(auth, email, password);

      // Add document to database
      await setDoc(doc(db, "users", credentials["user"]["uid"]), {
        email: credentials["user"]["email"],
        full_name: fullName,
        phone,
        created_at: Timestamp.now(),
      });

      // Set user in persistent storage
      await setItemAsync("user", credentials["user"]["uid"]);

      navigation.navigate("Welcome");
    } catch (e) {
      console.log(e);
      let errorMessage = "ההרשמה נכשלה";
      if (e.code == "auth/email-already-in-use") {
        errorMessage = "כתובת האימייל שהזנת כבר נמצאת בשימוש";
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
      <Title text="הרשמה" />

      {/* Form */}
      <View style={styles.form}>
        <TextInput label="שם מלא" value={fullName} onChangeText={setFullName} />
        <TextInput label="מספר טלפון" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
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
    backgroundColor: colors.background,
  },
  form: {
    width: "80%",
    marginTop: "6%",
  },
});
