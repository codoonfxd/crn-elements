import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { times } from 'lodash';
import { Gallery } from '../../src';

const getDataList = time => {
  return times(time, () => {
    return {
      url:
        'https://s1.codooncdn.com/operation-tools/internal-user/2019-03-26T20.06.40/375x375x21006xqKrjBNCpvzpFSHmaPY.jpeg',
    };
  });
};

class ButtonScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 16 }} />
          <Text
            style={{
              fontSize: 28,
              color: '#333',
              marginTop: 6,
              marginBottom: 6,
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            铺满布局
          </Text>
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
          <View>
            <Text
              style={{
                fontSize: 28,
                color: '#333',
                marginTop: 6,
                marginBottom: 6,
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              平铺布局
            </Text>
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
                    padding={8}
                    type="tile"
                    pictureStyle={{ borderRadius: idx + 6 }}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ButtonScreen;
