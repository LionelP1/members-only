const pool = require('./pool');

async function getMessages() {
  const query = `
  SELECT users.username, messages.title, messages.content, messages.created_at
  FROM users
  JOIN messages ON users.id = messages.user_id
  ORDER BY messages.id DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function addMessage(messageDetails) {
  const { user_id, title, content} = messageDetails;
  await pool.query('INSERT INTO messages (user_id, title, content) VALUES ($1, $2, $3)', [user_id, title, content]);
}

module.exports = {
  getMessages,
  addMessage,
};