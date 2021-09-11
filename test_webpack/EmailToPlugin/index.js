const path = require("path")
const emailTo = require("./emailTo")

class EmailToPlugin {
  constructor(options = {}) {
    this.options = options
  }
  apply(complier) {
    complier.hooks.afterDone.tap("EmailToPlugin", (stats) => {
      const { fromEmail, password, toEmail, host } = this.options
      if (stats) {
        const subject = stats.hasErrors()
          ? "[ERROR]Webpack打包失败"
          : "[SUCCESS]打包成功"
        const html =
          stats.toString() +
          `<div>打包时间${+new Date(stats.startTime).toLocaleString()}</div>`
        emailTo(host, fromEmail, password, toEmail, subject, html, (data) => {
          console.log(data)
        })
      }
    })
  }
}

module.exports = EmailToPlugin
