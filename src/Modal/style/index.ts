import { StyleSheet, ViewStyle } from 'react-native'
import { MODAL_ZINDEX, THEME_COLOR, WHITE_COLOR } from '../../lib/constant'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: MODAL_ZINDEX,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  maskWhite: {
    backgroundColor: WHITE_COLOR,
  },
  modalContent: {},
  footButtonContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#f2f2f2',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  footButton: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    borderColor: '#f2f2f2',
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  footFirstButton: {
    borderBottomLeftRadius: 5,
  },
  footLastButton: {
    borderBottomRightRadius: 5,
    borderRightWidth: 0,
  },
  footText: {
    color: THEME_COLOR,
  },
  activeFootText: {
    color: WHITE_COLOR,
  },
  modalBody: {
    width: 286,
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitleSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalTitle: {
    color: THEME_COLOR,
  },
})

export default styles
