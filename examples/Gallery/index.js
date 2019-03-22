import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { times } from 'lodash';
import { Gallery } from '../../src';

const getDataList = time => {
  return times(time, () => {
    return {
      url: 'http://webapp.codoon.com/codoon-welcome-cdn/images/about.8a224.png',
    };
  });
};

class ButtonScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 16 }} />
          {times(9, idx => {
            return (
              <View style={{ marginBottom: 16 }} key={idx}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#666',
                    marginTop: 6,
                    marginBottom: 6,
                    textAlign: 'center',
                  }}
                >
                  {idx + 1} 张图片布局
                </Text>
                <Gallery
                  dataList={getDataList(idx + 1)}
                  activeOpacity={0.8}
                  onPress={idx => {
                    alert('点击了第' + (idx + 1) + '张图片');
                  }}
                  style={{ borderRadius: idx + 4 }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default ButtonScreen;
