import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class DotViewLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{
            marginTop: 10,
            borderStyle: 'dotted',
            borderWidth: 1,
            borderRadius: 1,
          }}>
        </View>
    );
  }
}
