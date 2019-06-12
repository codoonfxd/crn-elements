import React, { ReactNode } from 'react'

/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-31 18:02:37
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-03-31 18:12:11
 * @Content: Utils
 */
export const delay = (time: number): Promise<NodeJS.Timeout> => {
  return new Promise((resolve) => {
    const taskID = setTimeout(() => {
      resolve(taskID)
    }, time)
  })
}

/**
 * determine wthether the component is a react class component
 * @param { object } component
 * @returns { boolean }
 */
export const isClassComponent = (
  component: ReactNode | React.Component
): boolean => {
  return Object.getPrototypeOf(component).name === 'Component'
}

/**
 * determine wthether the component is a react function component
 * @param { object } component
 * @returns { boolean }
 */
export const isFunctionComponent = (
  component: ReactNode | React.Component
): boolean => {
  return typeof component === 'function' && React.isValidElement(component())
}
