import "dotenv/config";

export default {
  name: "ברחובות שלנו",
  slug: "ourstreets",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon-ios.png",
  primaryColor: "#FFCB39",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#f4f4f4",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "org.ourstreets.ourstreets",
    buildNumber: "5",
    supportsTablet: false,
    config: {
      googleMapsApiKey: process.env.IOS_MAPS_API_KEY,
    },
    infoPlist: {
      NSCameraUsageDescription: "Allow access to camera to take photos of hazards",
      NSPhotoLibraryUsageDescription: "Allow access to photo library to choose photos of hazards",
      NSLocationWhenInUseUsageDescription: "Allow access to location to attach to the hazard report",
    },
  },
  android: {
    package: "org.ourstreets.ourstreets",
    versionCode: 5,
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_MAPS_API_KEY,
      },
    },
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#f4f4f4",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};
