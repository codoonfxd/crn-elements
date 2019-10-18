import { StyleSheet } from 'react-native'
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
  modalContent: {
    justifyContent: 'flex-start',
  },
  footButtonContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  footCancelButton: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 30,
    borderStyle: 'solid',
    marginRight: 16,
  },
  footConfirmButton: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: THEME_COLOR,
  },
  footCancelText: {
    color: '#7d7d7d',
  },
  footConfirmText: {
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
    color: '#222',
  },
})

export default styles
