const handleContactAdd = (ws, data) => {
  console.log("Custom event received:", data.payload.message);

  ws.send(`Response to a custom event "${data.payload.message}"`);
};

module.exports = handleContactAdd;
