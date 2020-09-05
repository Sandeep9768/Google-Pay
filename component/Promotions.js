import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, } from "react-native";
import React, { useState } from "react";
  const Promotions = (props) => {
   const renderContent=({item})=>{
        return(<TouchableOpacity style={{alignItems:'center',marginRight:"8%"}} onPress={() => { alert('user details') }}>
        <Image
          style={styles.avatar}
          source={item.profile}
        />
        <Text>{item.name}</Text>
      </TouchableOpacity>
        );
   }

        return (<View>
            <FlatList
              data={props.data}
              numColumns={4 }
              keyExtractor={(item, index) => index}
              renderItem={(item) => renderContent(item)}
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
export default Promotions;