import { StyleSheet, Dimensions } from 'react-native'
import { DEVICE_WIDTH } from '../../lib/constant'

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    borderStyle: 'solid',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
  },
  leftButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  rightButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DEVICE_WIDTH,
    zIndex: 100,
  },
})

export default style
