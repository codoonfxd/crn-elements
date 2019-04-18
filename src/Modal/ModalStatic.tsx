import React from 'react'
import Portal from '../Portal'
import ModalAlert, { IModalAlertConf } from './ModalAlert'

class ModalStatic {
  public key: any
  alert(config: IModalAlertConf) {
    this.key = Portal.add(<ModalAlert {...config} />)
  }
  prompt() {
    console.log(11)
  }
}

export default new ModalStatic()
