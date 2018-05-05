import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import NavigatorService from './../utils/navigator';
import { scaleModerate } from '../utils/scale';
import Icon from 'react-native-vector-icons/FontAwesome';

class Waiting_Room_Screen extends Component {

  static navigationOptions = {
    title: "Waiting Room",
  };

  static defaultProps = {
    station: "bob"
  };

  constructor(props) {
    super(props);
    this.state = { time: 10 };
  }

  tick() {
    if (this.state.time === 0) {
      this.props.navigation.navigate('travel')
    }
    this.setState(prevState => ({
      time: prevState.time - 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    let contentHeight = scaleModerate(400, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;
    let height_sub = height / 2;
    let width_sub = width - 40;

    let departure = this.props.station;
    if (departure === "Windsor") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/windsor.png')} />;
    }
    else if (departure === "London") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/london.png')} />;
    }
    else if (departure === "Kitchener-Waterloo") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/kitchener-waterloo.png')} />;
    }
    else if (departure === "Pearson Airport") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/pearson-airport.png')} />;
    }
    else if (departure === "Toronto Union") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/toronto-union.png')} />;
    }
    else if (departure === "Toronto East Harbour Transit Hub") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/toronto-east-harbour-transit-hub.png')} />;
    }
    else if (departure === "Kingston") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/kingston.png')} />;
    }
    else if (departure === "Ottawa") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/ottawa.png')} />;
    }
    else if (departure === "Montreal") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/montreal.png')} />;
    }
    else if (departure === "Quebec") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/quebec.png')} />;
    }
    else {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/backgroundLoginV6.png')} />;
    }

    let str = " minute"
    str = this.state.time < 2 ? str.concat(".") : str.concat("s.")

    return (
      <View style={styles.screen}>

        {image}

        <RkText style={styles.paragraph}>
          Welcome to the
          {"\n"}
          <RkText rkType='bold' style={styles.emphasis}>
            {this.props.station}
          </RkText>
          {"\n"}
          station!
        </RkText>

        <RkText style={styles.paragraph}>
          Your train will arrive in {"\n"}

          <RkText rkType='bold' style={styles.emphasis}>
            {this.state.time}
            {str}
          </RkText>
        </RkText>

      </View>
    )
  }
}

const mapStateToProps = ({ qr }) => {
  const { stpName } = qr.onboard;
  return { station: stpName };
};

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    paddingVertical: 0,
    alignItems: 'center',
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
    color: "#34495e"
  },
  emphasis: {
    fontSize: 26
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 25
  }
}));

export default connect(mapStateToProps, null)(Waiting_Room_Screen);
