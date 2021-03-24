import express from 'express'
import SA from 'superagent'
import cheerio from 'cheerio'

const app = express()

app.get('/',function(req,res,next) {
  SA.get('https://cnodejs.org')
  .end(function(err,sres) {
    if(err) return next(err)
    const $ = cheerio.load(sres.text)
    const items = []
    $('#topic_list .cell').each((idx,element) => {
      const $element = $(element)
      const author = $element.children('.user_avatar').attr('href').split('/')[2]
      items.push({
        index:idx,
        title: $element.find('.topic_title').attr('title'),
        href: $element.find('.topic_title').attr('href'),
        author: author
      })
    })
    res.send(items)
  })
})

app.listen(3000,() => {
  console.log('app is running at port 3000');
})