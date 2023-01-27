const express = require('express')
const line = require('@line/bot-sdk')

const { ask } = require('./ask')

const app = express()


const config = {
    channelAccessToken: xxxx,
    channelSecret: xxxx
}

const client = new line.Client(config)

app
.get('/', async (req, res) => {
  res.send('Hello World')
})
.post('/webhook', line.middleware(config) , async (req, res) => {
    console.log('hook')
    const event = req.body.events
    const message = event.map(i => i.message)[0].text
    console.log(message)
    const result = await ask(message)
    const replyToken = event.map(i => i.replyToken)[0]
    console.log(replyToken)
    client.replyMessage(replyToken, {
        type: 'text',
        text: result
    })
    res.sendStatus(200)
})

app.listen(3000)