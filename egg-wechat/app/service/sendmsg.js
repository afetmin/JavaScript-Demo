const Service = require("egg").Service
const moment = require("moment")

class sendmsg extends Service {
  async sendOut() {
    const { ctx, app } = this
    const token = await this.getToken()
    const data = await this.getTemplateData()
    ctx.logger.info("获取token结果：%j", token)

    const users = app.config.wechat.users
    const promise = users.map((id) => {
      ctx.logger.info("-----开始发送每日提醒----: %j", id)
      data.touser = id
      return this.toWechat(token, data)
    })
    const promiseArr = await Promise.all(promise)
    ctx.logger.info("----发送完成----： %j", promiseArr)
    return promiseArr
  }

  async toWechat(token, data) {
    // 模板消息接口文档
    const url =
      "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" +
      token
    const result = await this.ctx.curl(url, {
      method: "POST",
      data,
      dataType: "json",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return result
  }

  async getToken() {
    const { app } = this
    const url =
      "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
      app.config.wechat.appid +
      "&secret=" +
      app.config.wechat.secret
    const result = await this.ctx.curl(url, {
      method: "get",
      dataType: "json",
    })
    if (result.status === 200) {
      return result.data.access_token
    }
  }
  async getTemplateData() {
    const { app } = this
    const data = {
      topcolor: "#FF0000",
      data: {},
    }
    data.template_id = app.config.wechat.daily
    const getWeather = await this.getWeather()
    const message = await this.getOneSentence()

    data.data = {
      dateTime: {
        value: this.getDatetime(),
        color: "#cc33cc",
      },
      wea: {
        value: getWeather.wea,
        color: "#33ff33",
      },
      tem: {
        value: getWeather.tem,
        color: "#0066ff",
      },
      airLevel: {
        value: getWeather.air_level,
      },
      tem1: {
        value: getWeather.tem1,
        color: "#ff0000",
      },
      tem2: {
        value: getWeather.tem2,
        color: "#33ff33",
      },
      win: {
        value: getWeather.win,
        color: "#3399ff",
      },
      message: {
        value: message,
        color: "#8C8C8C",
      },
    }
    return data
  }

  async getWeather(city = "大连") {
    const { app } = this
    const url =
      "https://www.tianqiapi.com/api?unescape=1&version=v6&appid=" +
      app.config.weather.appid +
      "&appsecret=" +
      app.config.weather.secret +
      "&city=" +
      city
    const result = await this.ctx.curl(url, {
      method: "get",
      dataType: "json",
    })
    console.log(result.status)
    if (result && result.status === 200) {
      return result.data
    }
    return {
      city,
      wea: "未知",
      tem: "未知",
      tem1: "未知",
      tem2: "未知",
      win: "未知",
      win_speed: "未知",
      air_level: "未知",
    }
  }

  async getOneSentence() {
    const url = "https://v1.hitokoto.cn/"
    const result = await this.ctx.curl(url, {
      method: "get",
      dataType: "json",
    })
    if (result && result.status === 200) {
      return result.data.hitokoto
    }
    return "F K！"
  }

  getDatetime() {
    const week = {
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六",
      0: "星期日",
    }
    return moment().format("YYYY年MM月DD日 ") + week[moment().weekday()]
  }
}

module.exports = sendmsg
