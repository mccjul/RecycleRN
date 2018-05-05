import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions
} from 'react-native';
import NavigatorService from './../utils/navigator';
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkButton,
  RkTheme
} from 'react-native-ui-kitten';
import { loginStatusChanged, authStateChanged } from '../actions';
import { connect } from 'react-redux';
import { UtilStyles } from '../style/styles';
import { scaleModerate } from '../utils/scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import { pay } from '../actions'

class ThankYou_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.pay(this.cost(), this.props.startNum, this.props.stopNum)
  }

  cost() {
    let start_num = this.props.startNum.replace(/\D+/g, '');
    let stop_num = this.props.stopNum.replace(/\D+/g, '');
    let max = Math.max(start_num, stop_num)
    let min = Math.min(start_num, stop_num)
    return (1 + max - min) * 10
  }

  render() {

    let contentHeight = scaleModerate(450, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;
    let height_sub = height / 2;
    let width_sub = width - 40;

    let arrival = this.props.stop_station;
    if (arrival === "Windsor") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/windsor.png')} />;
    }
    else if (arrival === "London") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/london.png')} />;
    }
    else if (arrival === "Kitchener-Waterloo") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/kitchener-waterloo.png')} />;
    }
    else if (arrival === "Pearson Airport") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/pearson-airport.png')} />;
    }
    else if (arrival === "Toronto Union") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/toronto-union.png')} />;
    }
    else if (arrival === "Toronto East Harbour Transit Hub") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/toronto-east-harbour-transit-hub.png')} />;
    }
    else if (arrival === "Kingston") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/kingston.png')} />;
    }
    else if (arrival === "Ottawa") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/ottawa.png')} />;
    }
    else if (arrival === "Montreal") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/montreal.png')} />;
    }
    else if (arrival === "Quebec") {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/quebec.png')} />;
    }
    else {
      image = <Image style={[styles.image, { height, width }]} source={require('../assets/images/backgroundLoginV6.png')} />;
    }

    return (
      <View style={styles.screen}>

        {image}

        <RkText style={styles.paragraph}>
          Dear valued customer,
          {"\n"}{"\n"}
          Your trip from
          {"\n"}
          <RkText rkType='bold' style={styles.boldness}>
            {this.props.start_station}
          </RkText>
          {"\n"}
          to
          {"\n"}
          <RkText rkType='bold' style={styles.boldness}>
            {this.props.stop_station}
          </RkText>
          {"\n"}
          will cost
          {"\n"}
          <RkText rkType='bold' style={styles.emphasis}>
            {" "}${this.cost()}
          </RkText>
          .
          {"\n"}{"\n"}

          An email will be sent to you shortly after to confirm the transaction.
        </RkText>

        <RkButton
          style={[{ width: 250, justifyContent: 'flex-start' }, UtilStyles.spaceVertical]}
          onPress={() => NavigatorService.reset('main_screen')}
          rkType='large rounded success'>
          <Icon style={[UtilStyles.icon, UtilStyles.iconRound, { marginHorizontal: 8, color: 'white' }]} name={'heart'} size={20} />
          <RkText rkType='bold caption'>Thank you for using Kata</RkText>
        </RkButton>
      </View>
    )
  }
}

const mapStateToProps = ({ qr, auth }) => {
  return { start_station: qr.onboard.stpName, stop_station: qr.deboard.stpName, startNum: qr.onboard.stpNum, stopNum: qr.deboard.stpNum };
};

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    paddingVertical: 50,
    alignItems: 'center',
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  emphasis: {
    fontSize: 26
  },
  boldness: {
    fontSize: 18
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 25
  }
}));

export default connect(mapStateToProps, { pay })(ThankYou_Screen);