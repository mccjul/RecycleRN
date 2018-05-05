import Expo from "expo";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Button,
  TouchableOpacity
} from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import NavigatorService from "./utils/navigator";
import { RkTheme, RkButton, RkStyleSheet } from "react-native-ui-kitten";
import { bootstrap } from "./style/themeBootstrapper";
import { UtilStyles } from "./style/styles";
import { AppLoading, Font, Asset } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";

import Welcome_Screen from "./screens/Welcome_Screen";
import Profile_Screen from "./screens/Profile_Screen";
import Login_Screen from "./screens/Login_Screen";
import Register_Screen from "./screens/Register_Screen";
import Reset_Screen from "./screens/Reset_Screen";
import Menu_Screen from "./screens/Menu_Screen";
import QrScan_Screen from "./screens/QrScan_Screen";
import QrScan_Screen_Deboard from "./screens/QrScan_Screen_Deboard";
import Settings_Screen from "./screens/Settings_Screen";
import Waiting_Room_Screen from "./screens/Waiting_Room_Screen";
import ThankYou_Screen from "./screens/ThankYou_Screen";
import Map_Screen from "./screens/Map_Screen";

bootstrap();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  }

  state = {
    loaded: false
  };

  componentWillMount() {
    this._loadAssetsAsync();
    this._cacheResourcesAsync();

    firebase.initializeApp({
      apiKey: "AIzaSyCzt6SefehE6JmmQdTaZ0t9B2DfyvwJC9k",
      authDomain: "ktaa-13a11.firebaseapp.com",
      databaseURL: "https://ktaa-13a11.firebaseio.com",
      projectId: "ktaa-13a11",
      storageBucket: "ktaa-13a11.appspot.com",
      messagingSenderId: "873334685017"
    });
  }
  
  async _cacheResourcesAsync() {
    const images = [
      require("./assets/icons/app-icon.png"),
      require("./assets/icons/loading-icon.png"),
      require("./assets/images/backgroundLoginV1.png"),
      require("./assets/images/backgroundLoginV5.png"),
      require("./assets/images/backgroundLoginV6.png"),
      require("./assets/images/cartLogo.png"),
      require("./assets/images/fastDelivery.png"),
      require("./assets/images/kingston.png"),
      require("./assets/images/kitchener-waterloo.png"),
      require("./assets/images/kittenImage.png"),
      require("./assets/images/london.png"),
      require("./assets/images/montreal.png"),
      require("./assets/images/ottawa.png"),
      require("./assets/images/pearson-airport.png"),
      require("./assets/images/quality.png"),
      require("./assets/images/quebec.png"),
      require("./assets/images/montreal.png"),
      require("./assets/images/toronto-east-harbour-transit-hub.png"),
      require("./assets/images/toronto-union.png"),
      require("./assets/images/valueForMoney.png"),
      require("./assets/images/waterloo.png"),
      require("./assets/images/windsor.png")
    ];

    await Asset.loadAsync(images);

    this.setState({ loaded: true });
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      "Roboto-Light": require("./fonts/Roboto-Light.ttf"),
      "Roboto-Medium": require("./fonts/Roboto-Medium.ttf"),
      Borg: require("./fonts/Borg.ttf"),
      Curely: require("./fonts/Curely.ttf"),
      FontAwesome: require("./fonts/FontAwesome.ttf")
    });
  };

  render() {
    if (!this.state.loaded) {
      return <AppLoading />;
    }

    const MainNavigator = TabNavigator(
      {
        menu_scr: {
          screen: Menu_Screen,
          title: "Kata",
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name={"train"} size={20} color={tintColor} />
            )
          }
        },
        board_scan: {
          screen: QrScan_Screen,
          title: "Board",
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name={"sign-in"} size={20} color={tintColor} />
            )
          }
        },
        waiting_room: {
          screen: Waiting_Room_Screen,
          title: "Waiting Room",
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name={"clock-o"} size={20} color={tintColor} />
            )
          }
        },
        travel: {
          screen: Map_Screen,
          title: "Travel",
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name={"map"} size={20} color={tintColor} />
            )
          }
        },
        deboard_scan: {
          screen: QrScan_Screen_Deboard,
          title: "Deboard",
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name={"sign-out"} size={20} color={tintColor} />
            )
          }
        }
      },
      {
        navigationOptions: ({ navigation }) => ({
          headerRight: (
            <TouchableOpacity
              onPress={() => NavigatorService.navigate("settings_screen")}
            >
              <Icon
                style={[UtilStyles.icon, { fontSize: 24, marginRight: 10 }]}
                name={"sliders"}
              />
            </TouchableOpacity>
          ),
          tabBarOnPress: ({ scene, previousScene, jumpToIndex }) => {
            if (previousScene.key === 'travel' && scene.route.key === 'deboard_scan') {
              jumpToIndex(4)
            }
            return;
          }
        }),

        tabBarPosition: "bottom"
      }
    );

    const LoginNavigator = StackNavigator({
      welcome_screen: { screen: Welcome_Screen },
      register_screen: { screen: Register_Screen },
      reset_screen: { screen: Reset_Screen },
      profile_screen: { screen: Profile_Screen },
      login_screen: { screen: Login_Screen },
      main_screen: { screen: MainNavigator },
      qr_scan: { screen: QrScan_Screen },
      settings_screen: { screen: Settings_Screen },
      thank_you: { screen: ThankYou_Screen },
      map_screen: { screen: Map_Screen }
    });

    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="default" />
          <LoginNavigator
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
        </View>
      </Provider>
    );
  }
}
