const Contacts = require("../../models/Contacts");

const handleContactAdd = async (ws, data) => {
  let payload = data.payload;

  const contacts = await Contacts.findAll({
    where: {
      user_id: payload.user_id,
      contact_user_id: payload.contact_user_id,
    },
  })

  const resp = {
    type: "contact-add",
    payload: {
      contacts
    },
  }

  ws.send(JSON.stringify(resp));
};

module.exports = handleContactAdd;
