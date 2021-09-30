'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async send() {
    const {ctx, app} = this
    ctx.body = app.config
    const result = await ctx.service.sendmsg.sendOut()
    ctx.logger.info('发送模板消息，结果:%j',result)
    ctx.body = result
    ctx.set('Content-type', 'application/json')
  }
}

module.exports = HomeController;
