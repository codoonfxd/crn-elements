import HomeScreen from '../HomeScreen';
import Button from '../Button';
import Gallery from '../Gallery';
import Portal from '../Portal';
import Toast from '../Toast';
import Provider from '../Provider';
import Tag from '../Tag';

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
  Tag: {
    screen: Tag,
    navigationOptions: {
      title: 'Tag',
    },
  },
};

export default routes;
