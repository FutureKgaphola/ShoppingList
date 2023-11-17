import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Entypo,Feather } from "@expo/vector-icons";
import Categorized from "../shared/SingleCategory";
import Unmanaged from "../shared/Unmanaged";
import { PaperProvider } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import CategoryModal from "../shared/CategoryModal";
import { Camera } from "expo-camera";
import { CameraContext } from "../CameraContext/CameraContextApi";
import { AddProducts } from "../Context/actions/CrudActions";
import { connect } from "react-redux";

const Home = ({AddProducts,ItemsPerCategory,navigation}) => {
  
const [hasCameraPermission, setHasCameraPermissions] = useState();
  const [visible, setVisible] = useState(false);
  const {image, setImage}=useContext(CameraContext);
  const [callerbutton,setcallerbutton]=useState('Unmanaged');
  const showModal = (msg) =>{
    setcallerbutton(msg);
    setVisible(true);
  } 
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      if(visible==false){
        setImage(null);
      }
    })()
  },[])
  return (
    <PaperProvider>
      <CategoryModal
        visible={visible}
        hideModal={hideModal}
        containerStyle={containerStyle}
        navigation={navigation}
        callerbutton={callerbutton}
      />
      
      <ScrollView scrollEnabled={true}>
      <View style={{flexDirection:"row",alignSelf: "center",gap:5,paddingTop:10}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Purchased')}>
          <Feather name="shopping-bag" size={26} color="black" />
          </TouchableOpacity>
      </View>
      
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
          }}
        >
          
          <Text
            style={{ fontSize: 20, fontWeight: "700"}}
          >
            Categorized
          </Text>
          

          <TouchableOpacity onPress={() => showModal('Categorized')}>
            <Entypo name="plus" size={34} color="#4A646C" />
          </TouchableOpacity>
        </View>

        <Card style={{ backgroundColor: "#fff", margin: 5 }}>
          <Categorized navigation={navigation}/>
        </Card>

        <Text style={{ alignSelf: "center", color: "gray" }}>
          This items are reserved for your own need
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "700", alignSelf: "center" }}
          >
            Unmanaged
          </Text>
          <TouchableOpacity onPress={() => showModal('Unmanaged')}>
          <Entypo name="plus" size={34} color="#4A646C" />
          </TouchableOpacity>
          
        </View>

        <Card style={{ backgroundColor: "#fff", margin: 5 }}>
          <Unmanaged navigation={navigation}/>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};
const mapStateToProps=(state)=>{
  return {
    ItemsPerCategory:state.Product.ItemsPerCategory
  }
}

const mapDispatchToProps={
  AddProducts,
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
