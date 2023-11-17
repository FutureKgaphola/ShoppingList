import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet} from "react-native";
import Home from "./screens/Home";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OpenCamera from "./screens/OpenCamera";
import { CameraProvider } from "./CameraContext/CameraContextApi";
import ListedCategory from "./screens/ListedCategory";
import { Provider } from "react-redux";
import store from "./Context/store";
import { StripeProvider } from "@stripe/stripe-react-native"
import Purchased from "./screens/Purchased";

const Stack = createNativeStackNavigator();

export default function App() {
  const KEY = process.env.EXPO_PUBLIC_API_KEY;
  const options = { title: "", headerShown: false };
  return (
    
    <SafeAreaProvider>
      <StripeProvider publishableKey={KEY}>
      <Provider store={store}>
      <CameraProvider>
      <NavigationContainer style={{ backgroundColor: "blue" }}>
        <Appbar.Header>
          <Appbar.Content title="Shopping List"/>
        </Appbar.Header>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={options}/>
          <Stack.Screen name="OpenCamera" component={OpenCamera} options={options}/>
          <Stack.Screen name="Purchased" component={Purchased} options={options}/>
          <Stack.Screen name="Listed Category" component={ListedCategory} options={options}/>
        </Stack.Navigator>
      </NavigationContainer>
      </CameraProvider>
      </Provider>
      </StripeProvider>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
