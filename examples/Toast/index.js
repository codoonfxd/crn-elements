import React from 'react';
import { ScrollView, View } from 'react-native';
import { Toast, Button, Portal } from '../../src';

class ToastScreen extends React.Component {
  state = {
    count: 0,
  };

  render() {
    const { count } = this.state;
    return (
      <Portal style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Button
            title="show Toast"
            onPress={() => {
              this.setState({
                count: this.state.count + 1,
              });
              Toast.open({
                message: `Loading(times ${count})`,
                duration: 3000,
              });
            }}
          />
          <View style={{ height: 16 }} />
          <Button
            title="show Loading"
            onPress={() => {
              Toast.showLoading();
              setTimeout(() => {
                Toast.hideLoading();
              }, 3000);
            }}
          />
        </ScrollView>
      </Portal>
    );
  }
}

export default ToastScreen;
