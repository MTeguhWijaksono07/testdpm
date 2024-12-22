import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import SplashScreen from "./src/pages/SplashScreen";
import Onboarding from "./src/pages/Onboarding";
import LoginScreen from "./src/pages/LoginScreen";
import TransactionScreen from "./src/pages/TransactionScreen"; // Ensure this path is correct
import WalletScreen from "./src/pages/WalletScreen";
import SettingsScreen from "./src/pages/SettingScreen";
import ReportScreen from "./src/pages/ReportScreen";

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : !isOnboarded ? (
          <Stack.Screen name="Onboarding">
            {(props) => <Onboarding {...props} setIsOnboarded={setIsOnboarded} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
            <Stack.Screen name="WalletScreen" component={WalletScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="ReportScreen" component={ReportScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
