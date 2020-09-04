import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Icon } from "native-base";
export default class ButtonUi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.onBooking}
        style={styles.btnClickContain}
        underlayColor="#042417"
      >
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    alignSelf: "stretch",
    backgroundColor: "rgb(236 242 247)",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 50,
    height: 30,
    width: 110,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 10,
  },
  btnIcon: {
    height: 10,
    width: 10,
  },
  btnText: {
    fontSize: 18,
    color: "#FAFAFA",
    marginLeft: 10,
    marginTop: 2,
  },
});
