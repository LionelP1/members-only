require('dotenv').config();

const expressSession = require('express-session');
const PrismaSessionStore = require('@quixo3/prisma-session-store').PrismaSessionStore;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = expressSession({
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    sessionDataFieldName: 'data',
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
});