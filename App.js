import { StatusBar } from "expo-status-bar";
import { I18nManager, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Assistant: require("./assets/fonts/Assistant.ttf"),
    "Assistant-Bold": require("./assets/fonts/Assistant-Bold.ttf"),
    "Assistant-Light": require("./assets/fonts/Assistant-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  setCustomText({ style: { fontFamily: "Assistant" } });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* <StatusBar style="auto" /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
