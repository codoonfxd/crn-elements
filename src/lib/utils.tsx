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
