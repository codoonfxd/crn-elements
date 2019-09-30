import HomeScreen from '../HomeScreen';
import Button from '../Button';
import Gallery from '../Gallery';
import Portal from '../Portal';
import Toast from '../Toast';
import Provider from '../Provider';
import PickerView from '../PickerView';
import Input from '../Input';
import Navigator from '../Navigator';
import Modal from '../Modal';

const routes = {
  Home: {
    screen: Modal,
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
  PickerView: {
    screen: PickerView,
    navigationOptions: {
      title: 'PickerView',
    },
  },
  Input: {
    screen: Input,
    navigationOptions: {
      title: 'Input',
    },
  },
  Navigator: {
    screen: Navigator,
    navigationOptions: {
      title: 'Navigator',
    },
  },
  Modal: {
    screen: Modal,
    navigationOptions: {
      title: 'Modal',
    },
  },
};

export default routes;
