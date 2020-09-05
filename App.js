import React, { Component } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TouchableHighlight,
  Image,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import ProfileIconsView from "./component/ProfileIconsView";
import { People, BuisnessBill, billType, promotions } from "./lib/lib";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
var HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 1 : 3;
var HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const demo = () => {
  HEADER_MAX_HEIGHT = screenHeight - 40;
  HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
};
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon } from "native-base";
import ButtonUi from "./component/ButtonUi";
import DotViewLine from "./component/DotViewLine";
import Promotions from "./component/Promotions";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View>
        <View style={styles.scrollViewContent}>
         
          <View>
            <Text style={{ fontSize: 17, paddingVertical: 10 }}>People</Text>
            <ProfileIconsView data={People}></ProfileIconsView>
          </View>
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 1,
              borderRadius: 1,
              marginVertical: 35,
              borderColor: "grey",
            }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 20 }}>Buisnesses & Bills</Text>

            <ButtonUi >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  alignSelf: "stretch",
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons name="bag-personal" size={18} color="blue" />

                <Text style={{ color: "blue" }}>Explore</Text>
              </View>
            </ButtonUi>
          </View>
          <ScrollView horizontal={true}>
            <View
              style={{
                marginTop: 10,
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "row",
              }}
            >
              {BuisnessBill.map((bill, i) => {
                return (
                  <ButtonUi >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        alignSelf: "stretch",
                        borderRadius: 10,
                        marginEnd: 10
                      }}
                    >
                      {/* <Icon
                        name="beer"
                        style={{ fontSize: 18, color: "gray" }}
                      /> */}
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 4,
                          borderColor: "black",
                        }}
                        source={bill.profile}
                      />
                      <Text style={{ color: "gray" }}>{bill.name}</Text>
                    </View>
                  </ButtonUi>
                );
              })}
            </View>
          </ScrollView>
          {/* bill Type */}
          <View style={{ marginTop: 20 }}>
            <ProfileIconsView data={billType}></ProfileIconsView>
          </View>

          <DotViewLine></DotViewLine>

          <View>
            <Text style={{ fontSize: 20 }}>Promotions</Text>
            {/* <ProfileIconsView data={promotions}></ProfileIconsView> */}
            <Promotions data={promotions}></Promotions>
          </View>

          <View style={{ marginTop: 25 }}>
            <TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="beer" style={{ fontSize: 18, color: "blue" }} />
                  <Text style={{ paddingLeft: 5 }}>
                    See all payment activity
                  </Text>
                </View>
                <View>
                  <AntDesign name="arrowright" size={24} color="black" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: 'space-around',
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="beer" style={{ fontSize: 18, color: "blue" }} />
                  <Text style={{ paddingLeft: 5 }}>
                    See all payment activity
                  </Text>
                </View>
                <View>
                  <AntDesign name="arrowright" size={24} color="black" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? 0 : 0
    );
    // alert('dgvdf')
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp",
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}

        // iOS offset for RefreshControl
        >
          {this._renderScrollViewContent()}
          <View >
            <Image
              style={{ flex: 1, height: 250, width: screenWidth, padding: 20, resizeMode: "cover" }}
              source={require("./assets/newInvite.jpg")}
            />
          </View>
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "#03A9F4",
              overflow: "hidden",
              height: HEADER_MAX_HEIGHT,
            },
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                width: null,
                height: HEADER_MAX_HEIGHT,
                resizeMode: "cover",
              },
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require("./assets/gPay.png")}
          />

          <View style={{ flex: 1, marginTop: 40, margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <AntDesign name="scan1" size={30} color="black" />
            <TouchableOpacity
             onPress={async () => {
              const a = await demo();
              alert(a);
              this.setState({
                refreshing: true,
              });
            }}
            >
              <MaterialIcons style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'black'
              }} name="person" size={30} color="black" />
            </TouchableOpacity>



          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    // margin: 15,
  },

  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    margin: 20,
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
});
