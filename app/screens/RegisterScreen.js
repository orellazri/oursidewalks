import { useState } from "react";
import { View, SafeAreaView, StyleSheet, Keyboard, ScrollView, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import Toast from "react-native-root-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { setItemAsync } from "expo-secure-store";

import { db, auth } from "../utils/firebase";
import { colors } from "../utils/data";
import ContinueButton from "../components/ContinueButton";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import { useReport } from "../utils/ReportContext";
import { CustomException, validEmail, hasNumber } from "../utils/utils";

export default function RegisterScreen({ navigation }) {
  const { setUid, retrieveUserInfo } = useReport();

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();

      // Form validation
      if (fullName == "" || phone == "" || email == "" || password == "") throw new CustomException("חובה להזין את כל הפרטים");
      if (!validEmail(email)) throw new CustomException("כתובת האימייל שהזנת אינה תקינה");
      if (password.length < 6) throw new CustomException("הסיסמה חייבת להכיל לפחות 6 תווים");
      if (hasNumber(fullName)) throw new CustomException("השם המלא שהזנת אינו תקין");
      if (phone.length < 9 || phone.length > 11) throw new CustomException("מספר הטלפון שהזנת לא תקין");

      setLoading(true);

      // Sign up
      const credentials = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);

      // Add document to database
      await setDoc(doc(db, "users", credentials["user"]["uid"]), {
        email: credentials["user"]["email"],
        full_name: fullName,
        phone,
        created_at: Timestamp.now(),
      });

      // Set user in persistent storage and state
      setUid(credentials["user"]["uid"]);
      await setItemAsync("uid", credentials["user"]["uid"]);
      retrieveUserInfo(credentials["user"]["uid"]);

      navigation.navigate("Welcome");
    } catch (e) {
      console.log(e);
      let errorMessage = "ההרשמה נכשלה";
      if (e.code == "auth/wrong-password") errorMessage = "ההתחברות נכשלה. אחד מהפרטים שהזנת לא נכונים";
      if (e instanceof CustomException) errorMessage = e.message;

      Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
        shadow: false,
      });

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#aaa" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <BackButton navigation={navigation} />
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
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  form: {
    width: "80%",
    marginTop: "6%",
  },
});
