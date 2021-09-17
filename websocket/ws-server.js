import { WebSocketServer } from "ws"

let count = 0
const ws = new WebSocketServer({ port: 8080 })
ws.on("connection", function (ws) {
  count++
  ws.nickName = "user" + count
  broadcast(ws.nickName + " comes in")
  ws.on("message", function (message) {
    broadcast(ws.nickName + " say: " + message)
  })
  ws.on("close", function () {
    broadcast(ws.nickName + " left")
  })
})

console.log("ws server @port 8080")

function broadcast(str) {
  ws.clients.forEach((client) => {
    client.send(str)
  })
}
