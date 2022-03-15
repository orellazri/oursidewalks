import { I18nManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";

import { ReportProvider } from "./utils/ReportContext";
import WelcomeScreen from "./screens/WelcomeScreen";
import PromptCaptureScreen from "./screens/PromptCaptureScreen";
import CameraCaptureScreen from "./screens/CameraCaptureScreen";
import PhotosPreviewScreen from "./screens/PhotosPreviewScreen";
import ChooseLocationScreen from "./screens/ChooseLocationScreen";

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
    <ReportProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="PromptCapture" component={PromptCaptureScreen} />
          <Stack.Screen name="CameraCapture" component={CameraCaptureScreen} />
          <Stack.Screen name="PhotosPreview" component={PhotosPreviewScreen} />
          <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReportProvider>
  );
}
