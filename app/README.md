This is the React Native mobile app.

## Usage

- Create a copy of `.env.example`named `.env`, and fill with the Google Credentials API Keys.

These keys are also loaded when building with EAS via Expo's Secrets. You might need to make sure they are set up correctly there as well.

In the `utils` directory:

- Create a copy of `firebase.example.js` named `firebase.js`, and fill with the correct configuration values.
- Create a copy of `keys.example.js` named `keys.js`, and fill with the necessary keys.

## Run:

`npm install` and `npm start` or `npm run ios --simulator="iPhone 12"`

## Build:

In the `utils` directory, temporarily remove/empty the `.gitignore` file, and then revert the changes after executing the build command.

In `app.config.js` increment `buildNumber` under `ios` and `versionCode` under `android`.

**Build for Android:**

```
eas build -p android
```

**Build for iOS:**

```
eas build -p ios
eas submit -p ios
```
