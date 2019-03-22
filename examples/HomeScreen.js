import React from 'react';
import { Button, View, ScrollView } from 'react-native';
import { map, keys, remove } from 'lodash';
import routes from './routes';

class HomeScreen extends React.Component {
  render() {
    const routesKeys = keys(routes);
    remove(routesKeys, item => item === 'Home');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView>
          {map(routesKeys, key => {
            return (
              <Button
                title={`${key} Examples`}
                onPress={() => {
                  this.props.navigation.navigate(key);
                }}
                key={key}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
