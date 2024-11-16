const messageQueries = require("../db/queries");

exports.getHomePage = (req, res) => {
  res.render('homepage');
};

exports.getMessagePage = async (req, res) => {
  try {
    const messages = await messageQueries.getMessages();
    res.setHeader('Cache-Control', 'no-store'); 
    res.render("message/messagesPage", { messages: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createNewMessage = async (req, res) => {
  try {
    const messageDetails = {
      user_id: req.user.id,
      title: req.body.title,
      content: req.body.content,
    };
    await messageQueries.addMessage(messageDetails);
    res.redirect("/messages");
  } catch (error) {
    console.error('Error creating new message:', error);
    res.status(500).send('Internal Server Error');
  }
};
