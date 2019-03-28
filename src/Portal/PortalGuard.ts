import { DeviceEventEmitter } from 'react-native'
import { ADD_TYPE, REMOVE_TYPE } from './constant'

export class PortalGuard {
  private _nextKey: number = 10000

  /**
   * 触发"添加"事件
   */
  add = (el: React.ReactNode) => {
    const key = this._nextKey++
    DeviceEventEmitter.emit(ADD_TYPE, { key, el })
    return key
  }

  /**
   * 触发"删除"事件
   */
  remove = (key: number) => {
    DeviceEventEmitter.emit(REMOVE_TYPE, { key })
  }

  /**
   * 触发"更新"事件
   */
  update = (key: number, el: React.ReactNode) => {
    if (key >= this._nextKey) {
      console.error(`Portal: 更新操作的key值(${key})必须小于当先使用的key值`)
    } else {
      DeviceEventEmitter.emit(ADD_TYPE, { key, el })
    }
  }
}

export default PortalGuard
