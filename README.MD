# React Native Assignment: Mobile Application

## Setup Instructions

### Clone the Repository:

git clone https://github.com/your-username/react-native-assignment.git
cd react-native-assignment

## Install Dependencies:

npm install

## Run the App:

npm start
Scan the QR code with the Expo Go app on your Android/iOS device or use an emulator.

## Firebase Configuration

1. Go to the Firebase Console.
2. Create a new project.
3. Enable Email/Password Authentication:
4. Navigate to Authentication > Sign-in method.
5. Enable Email/Password.
6. Add a web app to your Firebase project and copy the configuration keys.
7. Open the firebaseConfig.js file in the root directory and replace the placeholders with your

## Firebase credentials:

const firebaseConfig = {
apiKey: "your-api-key",
authDomain: "your-auth-domain",
projectId: "your-project-id",
storageBucket: "your-storage-bucket",
messagingSenderId: "your-messaging-sender-id",
appId: "your-app-id",
};

## How to Run the App
1. Ensure you have Node.js and Expo CLI installed.
2. Install dependencies:
   npm install
3. Configure Firebase by updating firebaseConfig.js with your credentials.
4. Start the app:
   npm start
   Scan the QR code with the Expo Go app or use an emulator.
## App Structure and Standout Points
# App Structure
assets/: Contains images and icons.
locales/: Includes translation files for English (en/translation.json) and Spanish (es/translation.json).
navigation/: Handles navigation logic in AppNavigator.js.
screens/: Contains all application screens:
Login.js: Login page.
Register.js: Registration page.
Listing.js: Listing page with infinite scrolling.
Details.js: Details page for selected items.
Settings.js: Language settings page.
firebaseConfig.js: Firebase configuration file.
i18n.js: Initialization for multilingual support.
App.js: Main entry point for the app.

## Standout Points
# Multilingual Support:

Users can switch between English and Spanish from the Settings page.
Implemented using react-i18next.

# Persistent Login:

User login sessions are stored in AsyncStorage.
Users remain logged in even after closing and reopening the app.

# Pull to Refresh:

Users can pull down the list on the Listing Page to reload the first set of items.

This README.md provides a clear and concise guide for setting up, configuring, and running the app, along with an overview of its structure and standout features.



