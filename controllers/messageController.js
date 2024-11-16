exports.getMessagePage = (req, res) => {
  res.render('message/messages');
};

exports.getHomePage = (req, res) => {
  res.render('homepage');
};