/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-04-16 14:54:37
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-04-16 15:10:23
 * @Content: add elements to root through the common rendering
 */
import * as React from 'react'
import Portal from './Portal'

interface IState {
  key: number | null
}

export class PortalConsumer extends React.Component<void, IState> {
  state: IState = {
    key: null,
  }

  componentDidMount() {
    const { children } = this.props
    const key = Portal.add(children)
    this.setState({
      key,
    })
  }

  componentDidUpdate() {
    const { key } = this.state
    const { children } = this.props
    if (key === null) {
      return null
    }
    Portal.update(key, children)
  }

  componentWillUnmount() {
    const { key } = this.state
    if (key === null) {
      return null
    }
    Portal.remove(key)
  }

  render() {
    return null
  }
}
