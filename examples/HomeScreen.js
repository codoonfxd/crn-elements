import React from 'react';
import { Button, View, ScrollView } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView>
          <Button
            title="Button Examples"
            onPress={() => this.props.navigation.navigate('Buttons')}
          />
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
