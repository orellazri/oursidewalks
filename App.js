import { I18nManager, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";

import { ReportProvider } from "./utils/ReportContext";
import WelcomeScreen from "./screens/WelcomeScreen";
import PromptCaptureScreen from "./screens/PromptCaptureScreen";
import CameraCaptureScreen from "./screens/CameraCaptureScreen";
import PhotosPreviewScreen from "./screens/PhotosPreviewScreen";
import ChooseLocationScreen from "./screens/ChooseLocationScreen";
import ChooseHazardType from "./screens/ChooseHazardType";
import FillReportScreen from "./screens/FillReportScreen";
import ReportSummaryScreen from "./screens/ReportSummaryScreen";
import ReportConfirmationScreen from "./screens/ReportConfirmationScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

LogBox.ignoreLogs(["Setting a timer", "AsyncStorage has been extracted"]);

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
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="ChooseHazardType" component={ChooseHazardType} />
            <Stack.Screen name="PromptCapture" component={PromptCaptureScreen} />
            <Stack.Screen name="CameraCapture" component={CameraCaptureScreen} />
            <Stack.Screen name="PhotosPreview" component={PhotosPreviewScreen} />
            <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} />
            <Stack.Screen name="FillReport" component={FillReportScreen} />
            <Stack.Screen name="ReportSummary" component={ReportSummaryScreen} />
            <Stack.Screen name="ReportConfirmation" component={ReportConfirmationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </ReportProvider>
  );
}
