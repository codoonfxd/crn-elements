import HomeScreen from '../HomeScreen';
import Button from '../Button';
import Gallery from '../Gallery';
import Portal from '../Portal';
import Toast from '../Toast';
import Provider from '../Provider';
import Input from '../Input';

const routes = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'crnElements',
    },
  },
  Buttons: {
    screen: Button,
    navigationOptions: {
      title: 'Button',
    },
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      title: 'Gallery',
    },
  },
  Portal: {
    screen: Portal,
    navigationOptions: {
      title: 'Portal',
    },
  },
  Toast: {
    screen: Toast,
    navigationOptions: {
      title: 'Toast',
    },
  },
  Provider: {
    screen: Provider,
    navigationOptions: {
      title: 'Provider',
    },
  },
  Input: {
    screen: Input,
    navigationOptions: {
      title: 'Input',
    },
  },
};

export default routes;
