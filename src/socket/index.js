const WebSocket = require("ws");
const handleMessage = require("./events/handleMessage");
const handleMessageSent = require("./events/handleMessageSent");
const handleContactAdd = require("./events/handleContactAdd");
const handleTypingStart = require("./events/handleTypingStart");
const handleTypingStop = require("./events/handleTypingStop");

const configureWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected to WebSocket");

    ws.on("message", (event) => {
      console.log("Message received:", event);
      console.log("type:", typeof event);

      let data;
      try {
        data = JSON.parse(event);
        console.log('data', data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }

      switch (data.type) {
        case 'init':
          console.log("Client connected to WebSocket", data.payload);
          break
        case 'message':
          handleMessage(ws);
          break
        case 'message-sent':
          handleMessageSent(ws, data);
          break
        case 'contact-add':
          handleContactAdd(ws, data);
          break;
        case 'typing-start':
          handleTypingStart(ws, data);
          break;
        case 'typing-stop':
          handleTypingStop(ws, data);
          break;
        case 'seen':
          handleSeen(ws, data);
          break;
        default:
          break;
      }

      ws.send(`Message reply "${data.payload.message}"`);
      ws.send(`Response to a custom event "${data.payload.message}"`);
    });

    ws.on("close", () => {
      console.log("Client disconnected from WebSocket");
    });
  });
};

module.exports = configureWebSocket;
