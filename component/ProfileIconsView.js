import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import React from "react";

function ProfileIconsView(props) {
  var data = props.data.slice(0, 9);
  console.log(data, "sacds");
  var newData = data.push({
    profile: require("../assets/splash.png"),
    name: "push",
  });
  console.log(newData);
  const renderContent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
            }}
          />
        </TouchableOpacity>
        <Text style={styles.name}>name</Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        numColumns={4}
        keyExtractor={(item, index) => index}
        renderItem={(item) => renderContent()}
      />
    </View>
  );
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
  name: {
    fontSize: 13,
    color: "gray",
    fontWeight: "600",
  },
});
export default ProfileIconsView;
