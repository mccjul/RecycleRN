import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { BarCodeScanner, Permissions } from 'expo';
import { UtilStyles } from '../style/styles';
import NavigatorService from './../utils/navigator';
import { onBoard } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

class Camera_Screen extends Component {
  static navigationOptions = {
    title: 'Caméra',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: 'mediumseagreen'
    }
  };

  constructor(props) {
    super(props);
    this.scanSuccess = false;
  }

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handlePress = () => {
    this.props.navigation.navigate("main_screen");
  };

  _handleBarCodeRead = ({ type, data }) => {
    if (this.scanSuccess) return;
    this.scanSuccess = true;
    this.props.onBoard(data)
  }
}

const styles = StyleSheet.create({
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  caption: {
    marginLeft: 16
  }
});

export default connect(null, {
  onBoard
})(Camera_Screen);
