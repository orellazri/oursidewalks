import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import ContinueButton from "../components/ContinueButton";

import TextInput from "../components/TextInput";
import Title from "../components/Title";

export default function LoginScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("sdfa");

  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Title text="הרשמה" />

      {/* Form */}
      <View style={styles.form}>
        <TextInput label="שם מלא" value={fullName} onChangeText={setFullName} />
        <TextInput label="כתובת אימייל" value={email} onChangeText={setEmail} />
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
