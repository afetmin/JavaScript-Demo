/* eslint valid-jsdoc: "off" */

"use strict"

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1632969065252_5634"

  // add your middleware config here
  config.middleware = []

  // https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
  config.wechat = {
    appid: "*******************",
    secret: "*********************",
    users: ["************************IFkZ1KC7c7Po"],
    daily: "UsIfA0kI5uGF9p-*******************",
  }
  /** https://www.tianqiapi.com/user/index */
  config.weather = {
    appid: "******",
    secret: "*********",
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
