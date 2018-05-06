import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { Camera, Permissions } from 'expo';
import { UtilStyles } from '../style/styles';
import NavigatorService from './../utils/navigator';
import { onBoard } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RkButton } from 'react-native-ui-kitten';

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
    type: Camera.Constants.Type.back
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
            <Camera style={{ flex: 1 }} type={this.state.type} ref={ (ref) => {this.camera = ref} }>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', alignItems: 'center' }}>
                     <TouchableOpacity style={{ flex: 1, paddingTop: 20, paddingRight: 20, alignSelf: 'flex-end' }} 
                            onPress={() => {
                                this.setState({
                                type: this.state.type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back,
                            }); }}>
                        <Icon 
                            style={[ UtilStyles.icon, {  color: 'white'} ]}
                            name={'undo'}
                            size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.snap.bind(this)}>
                        <Icon 
                            style={[ UtilStyles.icon, {  color: 'white', marginBottom: 20 } ]}
                            name={'camera'}
                            size={50} />
                    </TouchableOpacity>
                </View>     
            </Camera>
        </View>
      );
    }
  }

  _handlePress = () => {
    this.props.navigation.navigate("main_screen");
  };

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
        // photo returns Object
        //   Object {
        //     "height": 3468,
        //     "uri": "file:///var/mobile/Containers/Data/Application/FEF20E3F-EFAD-4BCC-83F7-5852670E50B3/Library/Caches/ExponentExperienceData/%2540r4ge%252Frecycleit/Camera/976B14EC-EB24-4BB0-A97C-6290F400D7C2.jpg",
        //     "width": 2304,
        //   }
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
  onBoard
})(Camera_Screen);
