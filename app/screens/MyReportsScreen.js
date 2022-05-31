import { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

import { db } from "../utils/firebase";
import { colors } from "../utils/data";
import { useReport } from "../utils/ReportContext";
import ReportRow from "../components/ReportRow";
import Title from "../components/Title";
import BackButton from "../components/BackButton";

export default function MyReportsScreen({ navigation }) {
  const { uid } = useReport();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // Load user's reports
    let querySnapshot = await getDocs(
      query(collection(db, "reports"), orderBy("created_at", "desc"), limit(30), where("user_id", "==", uid))
    );
    let reportsList = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      reportsList.push({
        id: doc.id,
        hazard_type: data.hazard_type,
        freetext: data.freetext,
        created_at: data.created_at,
      });
    });

    // Convert report names to titles in Hebrew
    querySnapshot = await getDocs(collection(db, "hazard-types"));
    let hazard_types = [];
    querySnapshot.forEach((doc) => {
      hazard_types[doc.id] = doc.data().title;
    });

    let newReportsList = reportsList;
    newReportsList.forEach((item) => {
      item.hazard_type = hazard_types[item.hazard_type];
    });
    setReports(newReportsList);

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
      {/* Back Button */}
      <BackButton navigation={navigation} />

      {/* Title */}
      <Title text="הדיווחים שלי" />

      {/* List */}
      <FlatList
        style={styles.list}
        data={reports}
        renderItem={({ item }) => (
          <ReportRow hazard_type={item.hazard_type} freetext={item.freetext} created_at={item.created_at} key={item.id} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  list: {
    width: "90%",
    marginTop: 20,
  },
});
