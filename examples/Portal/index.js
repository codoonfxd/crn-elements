import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Portal, Button } from '../../src';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../src/lib/constant';

class ButtonScreen extends React.Component {
  handleShowToast = msg => {
    const key = Portal.add(
      <View
        style={{
          position: 'absolute',
          top: DEVICE_HEIGHT / 3,
          width: DEVICE_WIDTH,
          paddingLeft: DEVICE_WIDTH / 8,
          paddingRight: DEVICE_WIDTH / 8,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderRadius: 5,
            justifyContent: 'center',
            padding: 6,
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>
            {msg}
          </Text>
        </View>
      </View>
    );
    setTimeout(() => {
      Portal.remove(key);
    }, 3000);
  };

  render() {
    return (
      <Portal style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Button
            title="显示Toast"
            onPress={this.handleShowToast.bind(this, '我就是Toast')}
          />
        </ScrollView>
      </Portal>
    );
  }
}

export default ButtonScreen;
