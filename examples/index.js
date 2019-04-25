import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import routes from './routes';

const RootStack = createStackNavigator(routes, {
  initialRouteName: 'PickerView',
  // initialRouteName: 'Home',
});

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
