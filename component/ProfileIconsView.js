import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, } from "react-native";
import React, { useState } from "react";
function ProfileIconsView(props) {
  var mndata = props.data.slice(0, 7);
  var mxdata = props.data
  const [minData, setMinData] = useState(mndata);
  const [maxData, setMaxData] = useState(mxdata);
  const [less, setLess] = useState(false);
  const renderContent = ({ item }, data) => {
    console.log(data.length);
    return (
      <View style={{ alignItems:'center',marginRight:"7%" }} >
        <View>
        
        {item.index == 7 && data.length == 7 ?
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           
            <TouchableOpacity  onPress={() => { setLess(!less) }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 63,
                borderWidth:1,
                borderWidth: 1,
                borderColor: "black",
                marginTop: 15,
              }}
              source={{ uri: "https://www.bx-cc.com/wp-content/uploads/2018/03/arrow-navigate.png", }}
            />
          </TouchableOpacity>
        </View>
        
          : data.length > 9 && data.length == item.index ? <TouchableOpacity onPress={() => { setLess(!less) }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 63,
                borderWidth:1,
                borderWidth: 1,
                borderColor: "black",
                marginTop: 15,
              }}
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGG7hl3c2qeePrrGItPZ9mh95bOk8xVR_PRQ&usqp=CAU" }}
            />
          </TouchableOpacity> : <View style={{ alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={() => { alert('user details') }}>
          <Image
            style={styles.avatar}
            source={ item.profile}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{item.name}</Text></View>}
        </View>
      </View>);
  };
  return (<View>
    <FlatList
      data={less ? maxData : minData}
      numColumns={4 }
      keyExtractor={(item, index) => index}
      renderItem={(item) => renderContent(item, less ? maxData : minData)}
    />
  </View>);
}



const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: 15,
  },
  name: { fontSize: 13, color: "gray", fontWeight: "600", }
  ,
});
export default ProfileIconsView;