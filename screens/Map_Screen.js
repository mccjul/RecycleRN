import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
  Dimensions,
  StyleSheet,
  Easing
} from "react-native";
import { RkText, RkCard, RkStyleSheet, RkTheme } from "react-native-ui-kitten";
import { Header } from "react-navigation";
import NavigatorService from "./../utils/navigator";
import { MapView, Circle, Constants, Location, Permissions } from "expo";
import { connect } from "react-redux";

class Map_Screen extends Component {

  static navigationOptions = {
    title: "Carte",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: 'mediumseagreen'
    }
  };


  constructor(props) {
    super(props);
    this.state = {}
  }


  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  render() {

    let region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0095,
      longitudeDelta: 0.095
    }

    let text = 'Waiting'
    if (this.state.location) {
      region.latitude = parseFloat(JSON.stringify(this.state.location.coords.latitude));
      region.longitude = parseFloat(JSON.stringify(this.state.location.coords.longitude));
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={{ flex: 1 }} >
        <Text style={{ flex: 1 }} >{text}</Text>
        <MapView
          style={{ flex: 9 }}
          region={region}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ qr }) => {
  return { startNum: 0 };
};

export default connect(mapStateToProps, null)(Map_Screen);
