import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { UtilStyles } from '../style/styles';
import { connect } from 'react-redux'
import { deBoard } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CustomNavButton = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => NavigatorService.navigate("travel")}>
        <Icon style={[UtilStyles.icon, {fontSize: 20, marginLeft: 10}]} name='chevron-left'/>
      </TouchableOpacity>
    </View>
  );
}

class QrScan_Screen_Deboard extends Component {
  static navigationOptions = {
    title: 'Unboarding',
    headerLeft: CustomNavButton()
  };

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

  _handleBarCodeRead = ({ type, data }) => {
    this.props.deBoard(data)
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
  deBoard
})(QrScan_Screen_Deboard);