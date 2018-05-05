import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import { RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { Walkthrough } from './../components/walkthrough';
import { Walkthrough1 } from './walkthroughs/walkthrough1';
import { Walkthrough2 } from './walkthroughs/walkthrough2';
import { Walkthrough3 } from './walkthroughs/walkthrough3';
import { PaginationIndicator } from './../components';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
import AppSpinner from './../components/Loading/AppSpinner';
import NavigatorService from './../utils/navigator';
import ErrorMessage from './../components/ErrorMessage';
import {UtilStyles} from '../style/styles';

class Welcome_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    this.props.authStateChanged();
  }

  changeIndex(index) {
    this.setState({ index })
  }

  render() {
    return (
      <View style={styles.screen}>
        <ErrorMessage />
        <Walkthrough onChanged={(index) => this.changeIndex(index)}>
          <Walkthrough1 />
          <Walkthrough2 />
          <Walkthrough3 />
        </Walkthrough>
        <PaginationIndicator length={3} current={this.state.index} />
          <RkButton rkType='large outline' onPress={() => { NavigatorService.reset('profile_screen'); }} style={UtilStyles.spaceVertical}>GET STARTED</RkButton>
      </View>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { loginStatus } = auth;
  return { loginStatus };
};

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    paddingVertical: 0,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 25
  }
}));

export default connect(mapStateToProps, {
  loginStatusChanged, authStateChanged
})(Welcome_Screen);