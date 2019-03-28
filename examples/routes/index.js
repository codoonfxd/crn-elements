import HomeScreen from '../HomeScreen';
import Button from '../Button';
import Gallery from '../Gallery';
import Portal from '../Portal';

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
};

export default routes;
