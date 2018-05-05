import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { RkText, RkTheme, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { Walkthrough } from './../components/walkthrough';
import { PaginationIndicator } from './../components';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
import AppSpinner from './../components/Loading/AppSpinner';
import NavigatorService from './../utils/navigator';
import ErrorMessage from './../components/ErrorMessage';
import { UtilStyles } from '../style/styles';
import {scale, scaleModerate, scaleVertical} from './../utils/scale';


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

    GoToMain=()=>{
        setTimeout(function(){
          NavigatorService.reset('main_screen')
        }, 2000);
      }

    render() {
        let contentHeight = scaleModerate(375, 1);
        let height = Dimensions.get('window').height - contentHeight;
        let width = Dimensions.get('window').width;
        let height_sub = height/2;
        let width_sub = width - 40;

        image = <Image onLoad={ this.GoToMain }  style={[styles.image, {height, width}]} source={require('../assets/images/backgroundLoginV7.png')}/> ;
// image_quality = <Image style={{ resizeMode: 'contain', height: height_sub, width: width_sub }} source={require('../../assets/images/fastDelivery.png')}/> ; 
        return (
            <View style={styles.screen}>
                <ErrorMessage />
                {image}
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

export default connect(null, {
    loginStatusChanged, authStateChanged
})(Welcome_Screen);