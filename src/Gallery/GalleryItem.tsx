/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-21 22:46:21
 * @Last Modified by:   沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-03-21 22:46:21
 * @Content: 单个图片
 */
import * as React from 'react'
import {
  Image,
  TouchableOpacity,
  ImageURISource,
  ViewStyle,
} from 'react-native'

export type IImageRendererType = (source: ImageURISource) => React.ReactNode

interface IProps {
  source: ImageURISource
  style?: ViewStyle | ViewStyle[]
  activeOpacity?: number
  imageRenderer?: IImageRendererType
  onPress?(): any
}

export default class GalleryItem extends React.Component<IProps> {
  render() {
    const { source, style, onPress, activeOpacity, imageRenderer } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
        {imageRenderer ? (
          imageRenderer(source)
        ) : (
          <Image source={source} style={style} />
        )}
      </TouchableOpacity>
    )
  }
}
