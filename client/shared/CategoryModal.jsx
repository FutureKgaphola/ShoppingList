import { Alert, Image, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { List, Modal, Portal, TextInput, Button,Snackbar } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { CameraContext } from "../CameraContext/CameraContextApi";
import { AddProducts } from "../Context/actions/CrudActions";
import { connect } from "react-redux";

const CategoryModal = ({ visible, hideModal, containerStyle,navigation,callerbutton,AddProducts } ) => {
  const [ItemPrice, setItemPrice] = useState("");
  const [ItemDesc, setItemDesc] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedCategory,SetselectedCategory]=useState("");
  const {image, setImage}=useContext(CameraContext);
  const [isuploading, setUploading] = useState(false);
  const [isvisible, set_Visible] = useState(false);
  const onDismissSnackBar = () => set_Visible(false);

  const isReady = () => {
    var ok = true;
    if(selected == false){
      ok = false;
      if(callerbutton=='Unmanaged'){
        ok = true;
      }
      
    }
    if ( ItemPrice == 0.0 || ItemPrice <9.00 || ItemDesc == "") {
      ok = false;
      if(ItemPrice <9.00 ){
        Alert.alert("Minimum price error","Price has to be equal or grater than R9.00")
      }
    }
    return ok;
  };

  const reset=()=>{
    setItemPrice('');
    setImage(null);
    setItemDesc('');
    setUploading(false);
    setSelected(false);
    SetselectedCategory("");
  }
  const uploadProduct = async () => {
    if (isReady()) {
      setUploading(true);
      AddProducts(selected? selectedCategory: 'Unmanaged',ItemPrice,ItemDesc,image);
      reset();
      set_Visible(true);
    }else{
      Alert.alert('Error',"Please fill in required fields and make sure you selected a category if selectable.")
    }
  };

  const TakePicture = () => {
    navigation.navigate('OpenCamera');
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
          onPress={()=>TakePicture()}
            style={{ backgroundColor: "white", margin: 0,alignSelf:"center"  }}
            name="camera"
            size={24}
            color="black"
          />

          <Image
            style={{ width: 50, height: 50, objectFit: "contain",alignSelf:"center",marginLeft:10}}
            source={
              image !== null ? { uri: image } : require("../assets/shop.png")
            }
          />
        </View>
        <List.Section title={selected ? selectedCategory : "Category" && callerbutton=='Unmanaged' ? 'Unmanaged' : 'Category'}>
          <List.Accordion expanded={callerbutton=='Categorized' ? true : false}
            title="select Item category"
            left={(props) => <List.Icon {...props} icon="folder" />}
          >
            <List.Item
              title="Essential food"
              onPress={() =>{
                SetselectedCategory("Essential food");
                setSelected(true);
              }}
            />
            <List.Item title="Snacks" onPress={() =>{
              SetselectedCategory("Snacks");
              setSelected(true);
            }} />
            <List.Item
              title="Toiletries"
              onPress={() =>{
                SetselectedCategory("Toiletries");
                setSelected(true);
              }}
            />
          </List.Accordion>
        </List.Section>

        <TextInput
          label="Price"
          value={ItemPrice}
          mode="outlined"
          inputMode="numeric"
          onChangeText={(text) => setItemPrice(text.toString())}
          left={
            <TextInput.Icon
              icon={() => (
                <FontAwesome
                  style={{ backgroundColor: "white", margin: 0 }}
                  name="money"
                  size={24}
                  color="black"
                />
              )}
            />
          }
        />
        <TextInput
          label="Description"
          value={ItemDesc}
          mode="outlined"
          inputMode="text"
          multiline
          numberOfLines={4}
          onChangeText={(text) => setItemDesc(text)}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialIcons
                  style={{ backgroundColor: "white", margin: 0 }}
                  name="notes"
                  size={24}
                  color="black"
                />
              )}
            />
          }
        />
        <Button
          style={{
            backgroundColor: "#2C3135",
            borderRadius: 15,
            marginTop: 20,
          }}
          icon={() => (
            <MaterialIcons name="upload-file" size={24} color="white" />
          )}
          loading={isuploading}
          mode="contained"
          onPress={() => uploadProduct()}
        >
          {isuploading ? "Uploading..." : "Upload"}
        </Button>
        <Snackbar
          duration={1000}
          visible={isvisible}
          onDismiss={onDismissSnackBar}
        >
          Added to shopping cart.
        </Snackbar>
      </Modal>
    </Portal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryModal);
