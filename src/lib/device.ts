import { Platform, NativeModules } from 'react-native'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from './constant'

export const IS_IOS = Platform.OS === 'ios'
const IS_IPAD = (() => {
  const constants = NativeModules.PlatformConstants
  return constants ? constants.interfaceIdiom === 'pad' : false
})()
const IS_TVOS = (() => {
  const constants = NativeModules.PlatformConstants
  return constants ? constants.interfaceIdiom === 'tv' : false
})()
const X_WIDTH = 375 // iphonex
const X_HEIGHT = 812 // iphonex
const XSMAX_WIDTH = 414 // iphonex_max
const XSMAX_HEIGHT = 896 // iphonex_max

/**
 * 是否是iPhone X
 */
export const IS_IPHONE_X = (() => {
  return (
    (IS_IOS &&
      !IS_IPAD &&
      !IS_TVOS &&
      ((DEVICE_HEIGHT === X_HEIGHT && DEVICE_WIDTH === X_WIDTH) ||
        (DEVICE_HEIGHT === X_WIDTH && DEVICE_WIDTH === X_HEIGHT))) ||
    ((DEVICE_HEIGHT === XSMAX_HEIGHT && DEVICE_WIDTH === XSMAX_WIDTH) ||
      (DEVICE_HEIGHT === XSMAX_WIDTH && DEVICE_WIDTH === XSMAX_HEIGHT))
  )
})()
