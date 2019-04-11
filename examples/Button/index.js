import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '../../src';

class ButtonScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 16 }} />
          <Button title="Primary Button" onPress={() => {}} />
          <View style={{ height: 16 }} />
          <Button title="Ghost Button" ghost onPress={() => {}} />
          <View style={{ height: 16 }} />
          <Button title="Loading Button" loading onPress={() => {}} />
          <View style={{ height: 16 }} />
          <Button title="Disabled Button" disabled onPress={() => {}} />
          <View style={{ height: 16 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title="Custom Button"
              style={{
                width: 200,
                borderRadius: 100,
                backgroundColor: '#6b52ae',
              }}
              textStyle={{ color: '#eee', fontWeight: '500' }}
              onPress={() => {}}
              numberOfLines={2}
            />
          </View>
        </ScrollView>
        <Button
          style={{ position: 'absolute', bottom: 0, left: 0 }}
          title="Adapt iPhone X "
          onPress={() => {}}
          showBottomSpace
        />
      </View>
    );
  }
}

export default ButtonScreen;
