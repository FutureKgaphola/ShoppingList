import { Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useContext } from "react";
import { CameraContext } from "../CameraContext/CameraContextApi";

const ItemsPerCategory = [
  {
    key: 1,
    desc: "Maize meal",
    category: "Essential food",
    img:require("../assets/must-have.png")
  },
  {
    key: 2,
    desc: "Zimba",
    category: "Snacks",
    img:require("../assets/candies.png")
  },
  {
    key: 3,
    desc: "Tooth brush, Bath Soap",
    category: "Toiletries",
    img:require("../assets/toiletries.png")
  },
];


const SingleCategory = ({navigation}) => {
  const {setcategory}=useContext(CameraContext);
  return (
    <View>
      {ItemsPerCategory.map((item) => (
        <TouchableOpacity key={item.key} onPress={()=>{
          setcategory(item.category);
          navigation.navigate("Listed Category",{SelectedCategory:item.category})
        }}>
          <View style={{ padding: 10, flexDirection: "row" }}>
          <Image
            source={item.img}
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
                <Text style={{ fontWeight: "600" }}>{item.desc}...</Text>
                <Text style={{ color: "gray" }}>{item.category}</Text>
              </View>

              <Entypo
                name="chevron-thin-right"
                size={24}
                style={{ alignSelf: "center" }}
                color="black"
              />
            </View>
            <View style={{ backgroundColor: "gray", height: 0.5 }}></View>
          </View>
        </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SingleCategory;
