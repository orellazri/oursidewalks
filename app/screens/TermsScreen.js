import { useEffect, useState } from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../utils/firebase";
import BackButton from "../components/BackButton";
import Title from "../components/Title";
import { colors } from "../utils/data";

export default function TermsScreen({ navigation }) {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // Get hazard types from Firestore
    const docSnapshot = await getDoc(doc(db, "meta", "terms"));
    if (docSnapshot.exists()) {
      setTerms(docSnapshot.data().value);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#aaa" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} />

      {/* Title */}
      <Title text="תנאי שימוש" style={styles.title} />

      {/* Terms */}
      <ScrollView style={styles.termsContainer}>
        <Text style={styles.termsText}>{terms}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    textAlign: "center",
  },
  termsContainer: {
    margin: "5%",
  },
  termsText: {
    direction: "rtl",
    textAlign: "left",
  },
});
