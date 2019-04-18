import React from 'react'
import Modal, { IModalFootItem } from './Modal'

export interface IModalAlertConf {
  title: string
  subtitle?: string
  footButtons?: IModalFootItem[]
}

interface IState {
  visible: boolean
}
class ModalAlert extends React.Component<IModalAlertConf> {
  public state: IState = {
    visible: true,
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  render() {
    const { title, subtitle, footButtons } = this.props
    const { visible } = this.state
    return (
      <Modal
        title={title}
        footButtons={footButtons}
        visible={visible}
        onClose={this.onClose}
        animationType="fade"
        animateDuration={300}
      />
    )
  }
}

export default ModalAlert
