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
    title: "Carte"
  };

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 44.363518,
        longitude: -76.360238,
        latitudeDelta: 13,
        longitudeDelta: 15
      },
      markers: [
        {
          title: "Windsor",
          coordinates: {
            latitude: 42.324966,
            longitude: -83.007179
          },
          pinColor: "#FF0000"
        },
        {
          title: "London",
          coordinates: {
            latitude: 42.981506,
            longitude: -81.247084
          },
          pinColor: "#FF0000"
        },
        {
          title: "Kitchener-Waterloo",
          coordinates: {
            latitude: 43.455635,
            longitude: -80.493136
          },
          pinColor: "#FF0000"
        },
        {
          title: "Pearson Airport",
          coordinates: {
            latitude: 43.678123,
            longitude: -79.624995
          },
          pinColor: "#FF0000"
        },
        {
          title: "Toronto Union",
          coordinates: {
            latitude: 43.645268,
            longitude: -79.380537
          },
          pinColor: "#FF0000"
        },
        {
          title: "Toronto East Harbour Transit Hub",
          coordinates: {
            latitude: 43.656494,
            longitude: -79.345338
          },
          pinColor: "#FF0000"
        },
        {
          title: "Kingston",
          coordinates: {
            latitude: 44.257619,
            longitude: -76.536476
          },
          pinColor: "#FF0000"
        },
        {
          title: "Ottawa",
          coordinates: {
            latitude: 45.416327,
            longitude: -75.651603
          },
          pinColor: "#FF0000"
        },
        {
          title: "Montreal",
          coordinates: {
            latitude: 45.499983,
            longitude: -73.566643
          },
          pinColor: "#FF0000"
        },
        {
          title: "Quebec",
          coordinates: {
            latitude: 46.817582,
            longitude: -71.214163
          },
          pinColor: "#FF0000"
        }
      ],
      polylines: [
        [
          {
            latitude: 42.324966,
            longitude: -83.007179
          },
          {
            latitude: 42.981506,
            longitude: -81.247084
          },
          {
            latitude: 43.455635,
            longitude: -80.493136
          },
          {
            latitude: 43.678123,
            longitude: -79.624995
          },
          {
            latitude: 43.645268,
            longitude: -79.380537
          },
          {
            latitude: 43.656494,
            longitude: -79.345338
          },
          {
            latitude: 44.257619,
            longitude: -76.536476
          },
          {
            latitude: 45.416327,
            longitude: -75.651603
          },
          {
            latitude: 45.499983,
            longitude: -73.566643
          },
          {
            latitude: 46.817582,
            longitude: -71.214163
          }
        ]
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={this.state.region}>
          {this.state.markers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinates}
              title={marker.title}
              pinColor={marker.pinColor}
            />
          ))}

          {this.state.polylines.map((coordinates, index) => (
            <MapView.Polyline
              key={index}
              coordinates={coordinates}
              strokeColor={"#0000FF"}
              strokeWidth={2}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
}));

const mapStateToProps = ({ qr }) => {
  return { startNum: 0 };
};

export default connect(mapStateToProps, null)(Map_Screen);
