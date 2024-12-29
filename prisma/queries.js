const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMessages() {
  const messages = await prisma.message.findMany({
    select: {
      user: {
        select: { username: true },
      },
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy: { id: 'desc' },
  });

  return messages.map(msg => ({
    username: msg.user.username,
    title: msg.title,
    content: msg.content,
    created_at: msg.createdAt,
  }));
}

async function addMessage(messageDetails) {
  const { user_id, title, content } = messageDetails;

  await prisma.message.create({
    data: {
      userId: user_id,
      title,
      content,
    },
  });
}

module.exports = {
  getMessages,
  addMessage,
};
