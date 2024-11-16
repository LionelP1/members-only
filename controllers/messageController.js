exports.getMessagePage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store'); 
  res.render('message/messages');
};

exports.getHomePage = (req, res) => {
  res.render('homepage');
};