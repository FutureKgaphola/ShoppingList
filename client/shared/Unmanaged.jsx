import { Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Unmanaged = ({ navigation }) => {
  const ItemsPerCategory = [
    {
      key: 1,
      desc: "Alcohol, Gas, door bell",
      category: "Unmanaged",
      img: require("../assets/dog-walking.png"),
      alcohol: require("../assets/liquor.png")
    },
    
  ];
  return (
    <View>
      {ItemsPerCategory.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => navigation.navigate("Listed Category",{SelectedCategory:item.category})}
        >
          <View key={item.key} style={{ padding: 10, flexDirection: "row" }}>
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
            <Image
              source={item.alcohol}
              style={{
                width: 43,
                height: 43,
                marginLeft:5,
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

export default Unmanaged;
