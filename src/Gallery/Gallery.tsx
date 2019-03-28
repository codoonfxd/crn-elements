/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-21 19:13:00
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-03-22 10:16:46
 * @Content: 最多9张的画廊组件
 */
import * as React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import map from 'lodash/map'
import slice from 'lodash/slice'
import { DEVICE_WIDTH } from '../lib/constant'
import GalleryItem, { IImageRendererType } from './GalleryItem'

interface IGalleryUrl {
  url: string
}

/**
 * full: 尽量铺满屏幕
 * tile: 三张一行地平铺
 */
export type IGalleryType = 'full' | 'tile'

interface IProps {
  dataList: IGalleryUrl[] // 数据源
  gap?: number // 与屏幕两端之间的距离
  padding?: number // 照片之间的间隔
  style?: ViewStyle
  type?: IGalleryType
  activeOpacity?: number
  pictureStyle?: ViewStyle
  imageRenderer?: IImageRendererType
  oneLine?: boolean // 是否只一行展示图片（仅type为tile时可用）
  renderExtra?: React.ReactNode // 在图片库容器中渲染自定义内容
  onPress?(index: number): any
}

const DEFAULT_ONPRESS = () => null

export class PictureGallary extends React.Component<IProps> {
  renderTileGallery = () => {
    const {
      dataList,
      gap = 16,
      padding = 5,
      onPress = DEFAULT_ONPRESS,
      activeOpacity = 0.7,
      pictureStyle = {},
      imageRenderer,
      oneLine = false,
    } = this.props
    const width = (DEVICE_WIDTH - 2 * gap - 2 * padding) / 3
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: gap,
        }}
      >
        {map(slice(dataList, 0, oneLine ? 3 : dataList.length), (item, idx) => {
          return (
            <GalleryItem
              key={idx}
              source={{ uri: item.url }}
              style={[
                styles.pic,
                {
                  width,
                  height: width,
                  marginRight: padding,
                  marginBottom: padding,
                },
                pictureStyle,
              ]}
              onPress={onPress.bind(this, idx)}
              activeOpacity={activeOpacity}
              imageRenderer={imageRenderer}
            />
          )
        })}
      </View>
    )
  }
  /**
   * 渲染图片
   */
  renderGallery = () => {
    const {
      dataList,
      gap = 16,
      onPress = DEFAULT_ONPRESS,
      activeOpacity = 0.7,
      pictureStyle = {},
      imageRenderer,
      padding = 5,
    } = this.props
    /**
     * 只有一个照片
     */
    if (dataList.length === 1) {
      const width = DEVICE_WIDTH - 2 * gap
      return (
        <GalleryItem
          source={{ uri: dataList[0].url }}
          style={[
            styles.pic,
            { width, marginLeft: gap, height: width },
            pictureStyle,
          ]}
          onPress={onPress.bind(this, 0)}
          activeOpacity={activeOpacity}
          imageRenderer={imageRenderer}
        />
      )
    }
    /**
     * 两个照片
     */
    if (dataList.length === 2) {
      const width = (DEVICE_WIDTH - 2 * gap - padding) / 2
      return (
        <View style={{ flexDirection: 'row', marginLeft: gap }}>
          {map(dataList, (item, idx) => {
            return (
              <GalleryItem
                key={idx}
                source={{ uri: item.url }}
                style={[
                  styles.pic,
                  {
                    width,
                    height: width,
                    marginRight: idx === 0 ? 5 : 0,
                  },
                  pictureStyle,
                ]}
                onPress={onPress.bind(this, idx)}
                activeOpacity={activeOpacity}
                imageRenderer={imageRenderer}
              />
            )
          })}
        </View>
      )
    }
    /**
     * 三个照片
     */
    if (dataList.length === 3) {
      const sWidth = (DEVICE_WIDTH - 2 * gap - 2 * padding) / 3
      const lWidth = sWidth * 2 + padding
      return (
        <View style={{ flexDirection: 'row', marginLeft: gap }}>
          <GalleryItem
            source={{ uri: dataList[0].url }}
            style={[
              styles.pic,
              {
                width: lWidth,
                height: lWidth,
                marginRight: padding,
              },
              pictureStyle,
            ]}
            onPress={onPress.bind(this, 0)}
            activeOpacity={activeOpacity}
            imageRenderer={imageRenderer}
          />
          <View style={{ flexDirection: 'column' }}>
            {map(dataList, (item, idx) => {
              if (idx === 0) {
                return
              }
              return (
                <GalleryItem
                  key={idx}
                  source={{ uri: item.url }}
                  style={[
                    styles.pic,
                    {
                      width: sWidth,
                      height: sWidth,
                      marginBottom: idx === 1 ? padding : 0,
                    },
                    pictureStyle,
                  ]}
                  onPress={onPress.bind(this, idx)}
                  activeOpacity={activeOpacity}
                  imageRenderer={imageRenderer}
                />
              )
            })}
          </View>
        </View>
      )
    }
    /**
     * 四个照片
     */
    if (dataList.length === 4) {
      const width = (DEVICE_WIDTH - 2 * gap - padding) / 2
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: gap,
          }}
        >
          {map(dataList, (item, idx) => {
            return (
              <GalleryItem
                key={idx}
                source={{ uri: item.url }}
                style={[
                  styles.pic,
                  {
                    width,
                    height: width,
                    marginRight: idx % 2 === 0 ? padding : 0,
                    marginBottom: padding,
                  },
                  pictureStyle,
                ]}
                onPress={onPress.bind(this, idx)}
                activeOpacity={activeOpacity}
                imageRenderer={imageRenderer}
              />
            )
          })}
        </View>
      )
    }
    /**
     * 五个照片
     */
    if (dataList.length === 5) {
      const lWidth = (DEVICE_WIDTH - 2 * gap - padding) / 2
      const sWidth = (DEVICE_WIDTH - 2 * gap - padding) / 3
      return (
        <View style={{ marginLeft: gap }}>
          <View style={{ flexDirection: 'row' }}>
            {map(dataList, (item, idx) => {
              if (idx > 1) {
                return
              }
              return (
                <GalleryItem
                  key={idx}
                  source={{ uri: item.url }}
                  style={[
                    styles.pic,
                    {
                      width: lWidth,
                      height: lWidth,
                      marginRight: idx === 0 ? padding : 0,
                      marginBottom: padding,
                    },
                    pictureStyle,
                  ]}
                  onPress={onPress.bind(this, idx)}
                  activeOpacity={activeOpacity}
                  imageRenderer={imageRenderer}
                />
              )
            })}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {map(dataList, (item, idx) => {
              if (idx < 2) {
                return
              }
              return (
                <GalleryItem
                  key={idx}
                  source={{ uri: item.url }}
                  style={[
                    styles.pic,
                    {
                      width: sWidth,
                      height: sWidth,
                      marginRight: idx < 4 ? padding : 0,
                      marginBottom: padding,
                    },
                    pictureStyle,
                  ]}
                  onPress={onPress.bind(this, idx)}
                  activeOpacity={activeOpacity}
                  imageRenderer={imageRenderer}
                />
              )
            })}
          </View>
        </View>
      )
    }
    /**
     * 6 - 9个照片
     */
    if (dataList.length >= 6) {
      const width = (DEVICE_WIDTH - 2 * gap - 2 * padding) / 3
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: gap,
          }}
        >
          {map(dataList, (item, idx) => {
            return (
              <GalleryItem
                key={idx}
                source={{ uri: item.url }}
                style={[
                  styles.pic,
                  {
                    width,
                    height: width,
                    marginRight: padding,
                    marginBottom: padding,
                  },
                  pictureStyle,
                ]}
                onPress={onPress.bind(this, idx)}
                activeOpacity={activeOpacity}
                imageRenderer={imageRenderer}
              />
            )
          })}
        </View>
      )
    }
  }

  render() {
    const { style = {}, type = 'full', renderExtra = null } = this.props
    return (
      <View style={[{ position: 'relative' }, style]}>
        {type === 'full' ? this.renderGallery() : this.renderTileGallery()}
        {renderExtra}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pic: {
    borderRadius: 2,
  },
})

export default PictureGallary
