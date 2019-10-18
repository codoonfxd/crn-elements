/*
 * @Author: JaneEyre(lsy@codoon.com)
 * @Date: 2019-04-22 16:26:04
 * @Last Modified by:   JaneEyre(lsy@codoon.com)
 * @Last Modified time: 2019-04-22 16:26:04
 * @Content: Modal Static Class
 */
import * as React from 'react'
import Portal from '../Portal'
import ModalAlert, { IModalAlertConf } from './ModalAlert'
import ModalPrompt, { IModalPromptConf } from './ModalPrompt'

class ModalStatic {
  alert(config: IModalAlertConf) {
    const key = Portal.add(
      <ModalAlert
        {...config}
        onClose={() => {
          Portal.remove(key)
        }}
      />
    )
  }
  prompt(config: IModalPromptConf) {
    const key = Portal.add(
      <ModalPrompt
        {...config}
        onClose={() => {
          Portal.remove(key)
        }}
      />
    )
  }
}

export default new ModalStatic()
