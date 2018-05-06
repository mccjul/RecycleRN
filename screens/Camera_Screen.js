import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { connect } from 'react-redux'
import { Camera, Permissions } from 'expo';
import { UtilStyles } from '../style/styles';
import NavigatorService from './../utils/navigator';
import { getInfo } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RkButton } from 'react-native-ui-kitten';
import InfoModal from '../components/InfoModal';
import Location from 'expo/src/Location';
import Spinner from 'react-native-loading-spinner-overlay';

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
    type: Camera.Constants.Type.back,
    modalVisible: false,
    isLoading: false
  }

  _closeModal() {
    this.setState({ modalVisible: false });
  }

  _stopLoading() {
    this.setState({ isLoading: false });
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
          <Spinner visible={this.state.isLoading} color={'#003399'} size={'large'} />
          <Camera style={[{ flex: 1},  this.state.isLoading && {transform: [{ scale: 0 }]} ]} type={this.state.type} ref={(ref) => { this.camera = ref }}>
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity style={{ flex: 1, paddingTop: 20, paddingRight: 20, alignSelf: 'flex-end' }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon
                  style={[UtilStyles.icon, { color: 'white' }]}
                  name={'undo'}
                  size={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.snap.bind(this)}>
                <Icon
                  style={[UtilStyles.icon, { color: 'white', marginBottom: 30 }]}
                  name={'camera'}
                  size={55} />
              </TouchableOpacity>
            </View>
          </Camera>
          <InfoModal modalVisible={this.state.modalVisible} _closeModal={this._closeModal.bind(this)} />
        </View>
      );
    }
  }

  snap = async () => {
    if (this.camera) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        isLoading: true
      });

      let photo = await this.camera.takePictureAsync();
      str_loc = location.coords.latitude + ',' + location.coords.longitude
      await this.props.getInfo(photo, str_loc);

      this.setState({
        modalVisible: true,
        isLoading: false
      });
    }
  };
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
  getInfo
})(Camera_Screen);
