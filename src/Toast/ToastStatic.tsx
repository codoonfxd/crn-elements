/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-31 19:23:33
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-04-01 09:56:14
 * @Content: the static methods of Toast
 */
import * as React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Omit } from 'lodash'

import Toast, { IToastProps, DEFAULT_ANIMATE_DURATION } from './Toast'
import { delay } from '../lib/utils'
import Portal from '../Portal'

export interface IToastOpenConfig extends Omit<IToastProps, 'visible'> {
  onClose?(): any
}

const DEFAULT_DURATION = 2000

class ToastStatic {
  /** the Portal key of toast */
  private key: number = 0
  /** the props of toast */
  private toastConfig: IToastProps | null = null
  /** the id of timer */
  private cancelTask?: NodeJS.Timeout

  /**
   * open toast
   */
  open = (config: IToastOpenConfig) => {
    const { duration = DEFAULT_DURATION, onClose, ...others } = config
    const toastProps: IToastProps = {
      visible: true,
      ...others,
    }
    if (this.key) {
      Portal.update(this.key, <Toast {...toastProps} />)
    } else {
      this.key = Portal.add(<Toast {...toastProps} />)
    }
    // clear the previous timer
    if (this.cancelTask) {
      clearTimeout(this.cancelTask)
    }
    // store props of toast
    this.toastConfig = toastProps
    // store id of the asynchronous task
    if (duration !== 0) {
      this.cancelTask = setTimeout(() => {
        this.cancelTask = undefined
        this.destroy()
      }, duration)
      if (onClose) {
        onClose()
      }
    }
  }

  /**
   * destroy toast
   */
  destroy = async () => {
    const { toastConfig, key } = this
    if (key !== 0 && toastConfig) {
      const { animateConfig = {} } = toastConfig
      const { animateDuration = DEFAULT_ANIMATE_DURATION } = animateConfig
      toastConfig.visible = false
      Portal.update(key, <Toast {...toastConfig} />)
      await delay(animateDuration)
      return Portal.remove(key)
    }
  }

  /**
   * show the loading status
   */
  showLoading = (msg?: string) => {
    this.open({
      message: msg || '加载中',
      duration: 0,
      renderTop: (
        <View style={{ height: 48, justifyContent: 'center', width: 80 }}>
          <ActivityIndicator color="#fff" />
        </View>
      ),
      hasMask: true,
      textStyle: { lineHeight: 24 },
    })
  }

  /**
   * hide loading
   */
  hideLoading = () => {
    this.destroy()
  }
}

export const toastStatic = new ToastStatic()
