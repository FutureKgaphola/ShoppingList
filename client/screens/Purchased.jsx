import { StyleSheet, Text, View,Image, ScrollView } from "react-native";
import { CameraContext } from "../CameraContext/CameraContextApi";
import { Card } from "react-native-paper";
import { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Purchased = () => {
    const {setbought,bought}=useContext(CameraContext);
    const RemoveProducts=(id)=>{
        setbought(bought.filter(item=>id!==item.key));
    }
    return ( 
        <View styles={styles.container}>
            <Text style={{marginLeft:10,marginTop:20,fontSize:18}}>Purchased Items.</Text>
            <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
            {
                bought?.map((item) => (
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
                                RemoveProducts(item.key);
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
            }
            </ScrollView>
            
        </View>
     );
}
 
export default Purchased;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });