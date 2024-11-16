const messageQueries = require("../db/queries");

exports.getMessagePage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store'); 
  res.render('message/messages');
};

exports.getHomePage = (req, res) => {
  res.render('homepage');
};

exports.getMessageList = async (req, res) => {
  try {
    const messages = await messageQueries.getMessages();
    res.render("", { messages: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createNewMessage = async (req, res) => {
  try {
    await messageQueries.addMessage(req.body);
    res.redirect("/messages");
  } catch (error) {
    console.error('Error creating new message:', error);
    res.status(500).send('Internal Server Error');
  }
};
