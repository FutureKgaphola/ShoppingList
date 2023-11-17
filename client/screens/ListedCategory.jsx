import { Alert, View,Image, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Snackbar } from "react-native-paper";
import { RadioButton, Text } from "react-native-paper";
import { useEffect, useState,useContext } from "react";
import {
  AddProducts,
  RemoveProducts,
  FilterProducts,
} from "../Context/actions/CrudActions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { CameraContext } from "../CameraContext/CameraContextApi";
import { useRoute } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native"

const ListedCategory = ({navigation}) => {
  const [ItemsPerCategory, setItemsPerCategory] = useState([]);
  const [maxCost, SetMaxCost] = useState(0.00);

  const route = useRoute();
  const {bought, setbought}=useContext(CameraContext);
  let categ = route.params.SelectedCategory;

  const [value, setValue] = useState("All");
  const [shallowCopy, SetCopy] = useState([]);
  const data = useSelector(
    (state) => state.Product.ItemsPerCategory,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setItemsPerCategory(data?.filter((item) => item.category == categ));
  }, [data,shallowCopy]);
  useEffect(()=>{

  })

  const GetProdutsInRange = (newValue) => {
    setValue(newValue);
    
    if (newValue == "first") {
      SetCopy(
        ItemsPerCategory.filter((product) => parseFloat(product.price) <= 100.00)
      );
    } else if (newValue == "second") {
      
      SetCopy(
        ItemsPerCategory.filter(
         
          (product) =>
            parseFloat(product.price) > 100.00 &&
            parseFloat(product.price) <= 300.00
        )
      );
    } else if (newValue == "third") {
      SetCopy(
        ItemsPerCategory.filter(
          (product) =>
            parseFloat(product.price) > 300.00 &&
            parseFloat(product.price) <= 500.00
        )
      );
    } else {
      SetCopy([]);
    }
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout=async()=>{
    try {
      //this Ip address is not static on our server,
      // it is recomended that it is replaced by a static one
      // or a valid public domain used by the server making payments.
      const response = await fetch('http://192.168.87.51:4000/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //for stripe payment R9 will be equivalent to US$0.50 as required as minimum allowed payment
        body: JSON.stringify({ amount: shallowCopy.length>0 ?
          (shallowCopy?.reduce(function (acc, obj) { return parseFloat(acc) + parseFloat(obj.price) }, 0)).toFixed(2)
          :
        (ItemsPerCategory?.reduce(function (acc, obj) { return parseFloat(acc) + parseFloat(obj.price) }, 0)).toFixed(2) })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      const { error: paymentSheetError } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        paymentIntentClientSecret: responseData.paymenItent,
        defaultBillingDetails: {
          name: 'Future Kgaphola',
          email:'devslcx@gmail.com',
        },
      });
      if (paymentSheetError) {
        Alert.alert('Something went wrong', paymentSheetError.message);
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert(paymentError.code, paymentError.message);
        return;
      }
      CreateBought();//sent things you bought to Purchased section
    } catch (error) {
      console.log('Error:', error);
    }
  }
  const CreateBought=()=>{
    let data=[];
    data=shallowCopy.length>0 ? shallowCopy : ItemsPerCategory;
    setbought([...bought, ...data]);
    navigation.navigate('Home');
  }

  const [isvisible, set_Visible] = useState(false);
  const onDismissSnackBar = () => set_Visible(false);

  return (
    <View style={{ flexDirection: "row" }}>
      <Card
        style={{
          margin: 5,
          backgroundColor: "white",
          flexGrow: 1,
          paddingRight: 3,
        }}
      >
        <Text style={{ margin: 5 }}>Filter by price</Text>
        <RadioButton.Group
          onValueChange={(newValue) => GetProdutsInRange(newValue)}
          value={value}
        >
          <View style={{ flexDirection: "row" }}>
            <RadioButton value="All" color="red" />
            <Text style={{ alignSelf: "center" }}>All</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <RadioButton value="first" color="red" />
            <Text style={{ alignSelf: "center" }}>R0.00 - R100.00</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <RadioButton value="second" color="red" />
            <Text style={{ alignSelf: "center" }}>R200.00 - R300.00</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <RadioButton value="third" color="red" />
            <Text style={{ alignSelf: "center" }}>R400.00 - R500.00</Text>
          </View>
        </RadioButton.Group>
      </Card>
      <View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
        {
        shallowCopy.length == 0
          ? ItemsPerCategory?.map((item) => (
              <Card
                key={item.key}
                style={{ margin: 5, backgroundColor: "white" }}
              >
                <View style={{ padding: 10, flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.img }}
                    style={{
                      width: 43,
                      height: 43,
                      objectFit: "contain",
                      backgroundColor: "#4A646C",
                      borderRadius: 9,
                    }}
                  />
                  <View style={{ flexGrow: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flexGrow: 1,
                        gap: 5,
                      }}
                    >
                      <View style={{ margin: 5 }}>
                        <Text style={{ fontWeight: "600" }}>
                          {item.desc}...
                        </Text>
                        <Text style={{ color: "gray" }}>R{item.price}</Text>
                      </View>

                      <MaterialIcons
                        onPress={() => {
                          dispatch(RemoveProducts(item.key));
                          set_Visible(true);
                        }}
                        name="delete-outline"
                        size={24}
                        style={{ alignSelf: "center" }}
                        color="black"
                      />
                    </View>
                    <View
                      style={{ backgroundColor: "gray", height: 0.5 }}
                    ></View>
                  </View>
                </View>
              </Card>
            ))
          : shallowCopy?.map((item) => (
              <Card
                key={item.key}
                style={{ margin: 5, backgroundColor: "white" }}
              >
                <View style={{ padding: 10, flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.img }}
                    style={{
                      width: 43,
                      height: 43,
                      objectFit: "contain",
                      backgroundColor: "#4A646C",
                      borderRadius: 9,
                    }}
                  />
                  <View style={{ flexGrow: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flexGrow: 1,
                        gap: 5,
                      }}
                    >
                      <View style={{ margin: 5 }}>
                        <Text style={{ fontWeight: "600" }}>
                          {item.desc}...
                        </Text>
                        <Text style={{ color: "gray" }}>R{item.price}</Text>
                      </View>

                      <MaterialIcons
                        onPress={() => {
                          dispatch(RemoveProducts(item.key));
                          set_Visible(true);
                        }}
                        name="delete-outline"
                        size={24}
                        style={{ alignSelf: "center" }}
                        color="black"
                      />
                    </View>
                    <View
                      style={{ backgroundColor: "gray", height: 0.5 }}
                    ></View>
                  </View>
                </View>
                
              </Card>
            ))}
        </ScrollView>
        
            
        <Button
         onPress={()=>Alert.alert('Notification','Pay with cash or credit card',
         [
          {text: 'Cash', onPress: () => {
            Alert.alert('Notification','Thank you for shopping with us, kindly visit our cash till point and make your payment.',[
              {text:'OK',onPress: ()=>{ navigation.navigate('Home')}}
            ]);
          }},
          {text: 'Card', onPress: () =>onCheckout() },
          {text: 'Not now', onPress: () => {}},
         ])}
          style={{
            backgroundColor: "#2C3135",
            borderRadius: 15,
            margin: 10,
          }}
          icon={() => <MaterialIcons name="payments" size={24} color="white" />}
          loading={false}
          mode="contained"
        >
          checkout for R{
            shallowCopy.length>0 ?
            (shallowCopy?.reduce(function (acc, obj) { return parseFloat(acc) + parseFloat(obj.price) }, 0)).toFixed(2)
            :
          (ItemsPerCategory?.reduce(function (acc, obj) { return parseFloat(acc) + parseFloat(obj.price) }, 0)).toFixed(2)
          }
        </Button>
      </View>
      
      <Snackbar
        duration={1000}
        visible={isvisible}
        onDismiss={onDismissSnackBar}
      >
        Removed from cart.
      </Snackbar>
    </View>
  );
};

export default ListedCategory;
