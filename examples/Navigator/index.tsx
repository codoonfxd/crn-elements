import React from 'react'
import { View, Text, Image, ScrollView, Animated } from 'react-native'
import Navigator from '../../src/Navigator'

const IMG_URL =
  'https://s1.codooncdn.com/operation-tools/internal-user/2019-04-23T14.23.01/72x72x544xdaUrai1odRnUxpyrPR.png'
const IMG_URL2 =
  'https://s1.codooncdn.com/operation-tools/internal-user/2019-04-23T14.41.27/72x72x369xdLkz52m8fRCLON3O78.png'

interface IState {
  scrollY: Animated.Value
}

const ImageComp = () => {
  return <Image source={{ uri: IMG_URL }} style={{ width: 20, height: 20 }} />
}

class NavigatorExample extends React.Component {
  public state: IState = {
    scrollY: new Animated.Value(0),
  }

  render() {
    const { scrollY } = this.state
    return (
      <View>
        <Navigator title="Absolute Navigator" absolute />
        <ScrollView
          style={{ paddingTop: 20 }}
          scrollEventThrottle={10}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ])}
        >
          <View
            style={{ marginBottom: 40, paddingHorizontal: 10, marginTop: 70 }}
          >
            <Text style={{ fontWeight: 'bold' }}>default:</Text>
          </View>
          <Navigator title="Navigator Title" />

          <View
            style={{ marginBottom: 40, marginTop: 40, paddingHorizontal: 10 }}
          >
            <Text style={{ fontWeight: 'bold' }}>custom:</Text>
          </View>
          <Navigator
            title="Navigator Title3"
            leftButton={{
              children: ImageComp,
              activeOpacity: 1,
            }}
          />

          <View
            style={{ marginBottom: 40, marginTop: 40, paddingHorizontal: 10 }}
          >
            <Text style={{ fontWeight: 'bold' }}>custom2:</Text>
          </View>
          <Navigator
            title="Navigator Title4"
            leftButton={{
              children: (
                <Image
                  source={{ uri: IMG_URL }}
                  style={{ width: 20, height: 20 }}
                />
              ),
            }}
            rightButton={{
              children: (
                <Image
                  source={{ uri: IMG_URL2 }}
                  style={{ width: 20, height: 20 }}
                />
              ),
            }}
          />

          <View
            style={{ marginBottom: 40, marginTop: 40, paddingHorizontal: 10 }}
          >
            <Text style={{ fontWeight: 'bold' }}>custom3:</Text>
          </View>
          <Navigator
            title="Linear Gradient Nav"
            style={{
              flex: 2,
              backgroundColor: scrollY.interpolate({
                inputRange: [0, 100, 300],
                outputRange: ['#fff', '#f2f2f2', 'red'],
              }) as any,
            }}
          />

          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    )
  }
}

export default NavigatorExample
