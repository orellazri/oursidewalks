import { useState } from "react";
import { View, SafeAreaView, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import Toast from "react-native-root-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setItemAsync } from "expo-secure-store";

import { auth } from "../utils/firebase";
import { colors } from "../utils/data";
import ContinueButton from "../components/ContinueButton";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import { CustomException, validEmail } from "../utils/utils";
import { useReport } from "../utils/ReportContext";

export default function LoginScreen({ navigation }) {
  const { setUid, retrieveUserInfo } = useReport();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();

      // Form validation
      if (email == "" || password == "") throw new CustomException("חובה להזין את כל הפרטים");
      if (!validEmail(email)) throw new CustomException("כתובת האימייל שהזנת אינה תקינה");
      if (password.length < 6) throw new CustomException("הסיסמה חייבת להכיל לפחות 6 תווים");

      setLoading(true);

      // Log in
      const credentials = await signInWithEmailAndPassword(auth, email.toLowerCase(), password);

      // Set user in persistent storage and state
      setUid(credentials["user"]["uid"]);
      await setItemAsync("uid", credentials["user"]["uid"]);
      retrieveUserInfo(credentials["user"]["uid"]);

      navigation.navigate("Welcome");
    } catch (e) {
      let errorMessage = "התתחברות נכשלה";
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
