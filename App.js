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
import Camera_Screen from "./screens/Camera_Screen";
import Settings_Screen from "./screens/Settings_Screen";
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
      require("./assets/images/backgroundLoginV3.png"),
      require("./assets/images/backgroundLoginV7.png"),
      require("./assets/images/cartLogo.png"),
      require("./assets/images/cartLogo1.png")
    ];

    await Asset.loadAsync(images);

    this.setState({ loaded: true });
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
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
        map_screen: {
          screen: Map_Screen,
          title: "Carte",
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name={"map"} size={20} color={tintColor} />
            )
          }
        },
        camera_screen: {
          screen: Camera_Screen,
          title: "Caméra",
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name={"camera"} size={20} color={tintColor} />
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
                style={[UtilStyles.icon, { fontSize: 24, marginRight: 10, color: 'white'}]}
                name={"sliders"}
              />
            </TouchableOpacity>
          )
        }),
        tabBarPosition: "bottom",
        tabBarOptions: {
          activeTintColor: 'white',
          inactiveTintColor: 'darkgreen',
          style: {
            backgroundColor: 'mediumseagreen',
          },
        },
      }
    );

    const LoginNavigator = StackNavigator({
      welcome_screen: { screen: Welcome_Screen },
      main_screen: { screen: MainNavigator },
      camera_screen: { screen: Camera_Screen },
      map_screen: { screen: Map_Screen },
      settings_screen: { screen: Settings_Screen }
    });

    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
          />
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
