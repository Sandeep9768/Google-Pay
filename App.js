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
import { Dimensions } from "react-native";
import ProfileIconsView from "./component/ProfileIconsView";
import { People, BuisnessBill, billType, promotions } from "./lib/lib";
const screenHeight = Math.round(Dimensions.get("window").height);
var HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 1 : 3;
var HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const demo = () => {
  HEADER_MAX_HEIGHT = screenHeight - 40;
  HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
};
import { Button, Icon } from "native-base";
import ButtonUi from "./component/ButtonUi";
import DotViewLine from "./component/DotViewLine";
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
          <TouchableOpacity
            onPress={async () => {
              const a = await demo();
              alert(a);
              this.setState({
                refreshing: true,
              });
            }}
          >
            <Text>Press Here</Text>
          </TouchableOpacity>
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

            <ButtonUi width={90} height={30}>
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
                <Icon name="beer" style={{ fontSize: 18, color: "blue" }} />
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
                  <ButtonUi>
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
                      <Icon
                        name="beer"
                        style={{ fontSize: 18, color: "blue" }}
                      />
                      <Text style={{ color: "blue" }}>{bill.name}</Text>
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
            <ProfileIconsView data={promotions}></ProfileIconsView>
          </View>

          <View style={{ margin: 5 }}>
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
                  <Icon name="arrow-back" />
                </View>
              </View>
            </TouchableOpacity>
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
                  <Icon name="arrow-back" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Image
            style={{ flex: 1, height: 250, marginTop: 20, resizeMode: "cover" }}
            source={require("./assets/invite.jpg")}
          />
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
            source={require("./assets/profile1.png")}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    margin: 15,
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
