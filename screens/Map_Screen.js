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
  Easing,
  TextInput
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

  _getMarkers = (elec_dropoff) => {

    // elec_dropoff = elec_loc.NearestDropOff

    template = {
      title: "You are here!",
      coordinates: {
        latitude: -76.360238,
        longitude: 44.363518,
      },
      pinColor: "#00BFFF"
    }

    user_loc = {
      title: "You are here!",
      coordinates: {
        latitude: 44.363518,
        longitude: -76.360238,
      },
      pinColor: "#FF0000"
    }

    if (this.state.location) {
      user_loc.coordinates.latitude = parseFloat(JSON.stringify(this.state.location.coords.latitude));
      user_loc.coordinates.longitude = parseFloat(JSON.stringify(this.state.location.coords.longitude));
    }

    let markers = []
    markers.push(user_loc)


    // for (elec in elec_dropoff) {
    //   template.title = elec.name;
    //   template.coordinates.latitude = elec.Point.lat;
    //   template.coordinates.longitude = elec.Point.lon;
    //   markers.push(template)
    // }

    markers.push(...elec_dropoff.map((elm) => {
      return {
        title: elm.name,
        coordinates: {
          latitude: elm.Point.lon,
          longitude: elm.Point.lat,
        },
        pinColor: "#00BFFF"
      }
    }));

    return markers;
  }

  render() {

    elec_loc = {
      NearestDropOff: [
        {
          Point: {
            lat: -73.59755320,
            lon: 45.61221540
          },
          address: '770 rue Notre-Dame Ouest',
          name: 'Bureau en Gros; Notre Dame'
        },
        {
          Point: {
            lat: -73.47161050,
            lon: 45.47158570
          },
          address: '1230 rue Notre-Dame Ouest',
          name: 'Électrobac-Metro Plus de la Montagne oeAlimentation Sylvain Bolduc'
        },
        {
          Point: {
            lat: -73.62009930,
            lon: 45.52997060
          },
          address: '1100 rue Notre-Dame Ouest',
          name: 'Électrobac-École de Technologie Supérieure (ÉTS); Pavillon A'
        },
        {
          Point: {
            lat: -73.56281440,
            lon: 45.49516360
          },
          address: '1111 rue Notre-Dame Ouest',
          name: 'Électrobac-École de Technologie Supérieure (ÉTS); Pavillon B'
        },
        {
          Point: {
            lat: -75.71286060,
            lon: 45.42842540
          },
          address: '1100 boul. René-Lévesque O',
          name: 'Électrobac-1100 René-Lévesque; Oxford Properties'
        },
        {
          Point: {
            lat: -71.21985080,
            lon: 46.80610140
          },
          address: '1220 rue Notre-Dame Ouest',
          name: 'Électrobac-École de Technologie Supérieure (ÉTS); Pavillon Maison des étudiants'
        }
      ],
      type: 'Electronic'
    };

    let region = {
      latitude: 44.363518,
      longitude: -76.360238,
      latitudeDelta: 0.0095,
      longitudeDelta: 0.0095
    }

    let text = 'Waiting'
    if (this.state.location) {
      region.latitude = parseFloat(JSON.stringify(this.state.location.coords.latitude));
      region.longitude = parseFloat(JSON.stringify(this.state.location.coords.longitude));
      text = JSON.stringify(this.state.location);
    }

    let markers = this._getMarkers(this.props.NearestDropOff);

    return (
      <View style={{ flex: 1 }} >
        <MapView
          style={{ flex: 9 }}
          region={region}
        >
          {markers.map((marker, index) => {
            console.log('here', marker)
            return (
              <MapView.Marker
                key={index}
                coordinate={marker.coordinates}
                title={marker.title}
                pinColor={marker.pinColor}
              />
            )
          })}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = ({ info }) => {
  const { data } = info;
  if (data.type !== 'Electronic') {
    return { NearestDropOff: [] }
  }
  return { NearestDropOff: [...data.NearestDropOff] };
};

export default connect(mapStateToProps, null)(Map_Screen);
