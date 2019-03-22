/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-21 19:13:00
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-03-22 10:16:46
 * @Content: 最多9张的画廊组件
 */
import * as React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { map } from 'lodash'
import { DEVICE_WIDTH } from '../lib/constant'
import GalleryItem from './GalleryItem'

interface IGalleryUrl {
  url: string
}

interface IProps {
  dataList: IGalleryUrl[] // 数据源
  gap?: number // 照片之间的间隔
  style?: ViewStyle
  onPress?(index: number): any
}

const DEFAULT_ONPRESS = () => null

export class PictureGallary extends React.Component<IProps> {
  /**
   * 渲染图片
   */
  renderGallery = () => {
    const { dataList, gap = 16, onPress = DEFAULT_ONPRESS } = this.props
    /**
     * 只有一个照片
     */
    if (dataList.length === 1) {
      const width = DEVICE_WIDTH - 2 * gap
      return (
        <GalleryItem
          source={{ uri: dataList[0].url }}
          style={[styles.pic, { width, marginLeft: gap, height: width }]}
          onPress={onPress.bind(this, 0)}
        />
      )
    }
    /**
     * 两个照片
     */
    if (dataList.length === 2) {
      const width = (DEVICE_WIDTH - 2 * gap - 5) / 2
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
                ]}
                onPress={onPress.bind(this, idx)}
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
      const sWidth = (DEVICE_WIDTH - 2 * gap - 10) / 3
      const lWidth = sWidth * 2 + 5
      return (
        <View style={{ flexDirection: 'row', marginLeft: gap }}>
          <GalleryItem
            source={{ uri: dataList[0].url }}
            style={[
              styles.pic,
              {
                width: lWidth,
                height: lWidth,
                marginRight: 5,
              },
            ]}
            onPress={onPress.bind(this, 0)}
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
                      marginBottom: idx === 1 ? 5 : 0,
                    },
                  ]}
                  onPress={onPress.bind(this, idx + 1)}
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
      const width = (DEVICE_WIDTH - 2 * gap - 5) / 2
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
                    marginRight: idx % 2 === 0 ? 5 : 0,
                    marginBottom: 5,
                  },
                ]}
                onPress={onPress.bind(this, idx)}
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
      const lWidth = (DEVICE_WIDTH - 2 * gap - 5) / 2
      const sWidth = (DEVICE_WIDTH - 2 * gap - 8) / 3
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
                      marginRight: idx === 0 ? 5 : 0,
                      marginBottom: 5,
                    },
                  ]}
                  onPress={onPress.bind(this, idx)}
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
                      marginRight: idx < 4 ? 4 : 0,
                      marginBottom: 4,
                    },
                  ]}
                  onPress={onPress.bind(this, idx)}
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
      const width = (DEVICE_WIDTH - 2 * gap - 8) / 3
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
                    marginRight: 4,
                    marginBottom: 4,
                  },
                ]}
                onPress={onPress.bind(this, idx)}
              />
            )
          })}
        </View>
      )
    }
  }

  render() {
    const { style = {} } = this.props
    return <View style={style}>{this.renderGallery()}</View>
  }
}

const styles = StyleSheet.create({
  pic: {
    borderRadius: 2,
  },
})

export default PictureGallary
