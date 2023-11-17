import { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { CameraContext } from "../CameraContext/CameraContextApi";
import { Text } from "react-native";

const OpenCamera = ({navigation}) => {
  let cameraRef = useRef();
  const {image, setImage}=useContext(CameraContext);
  const [isproccesing,setProcessing]=useState(null);
  const TakePicture = async () => {
    setProcessing('processing image...');
    const photo = await cameraRef.current.takePictureAsync();
    setImage(photo.uri);
    navigation.navigate('Home');
    
  };

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camstyle} ref={cameraRef}></Camera>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => TakePicture()}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <Text>{isproccesing!==null ? isproccesing : isproccesing}</Text>
          <AntDesign name="camera" size={55} color="black" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OpenCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  camstyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
