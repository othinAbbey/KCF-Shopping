const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/auth', authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
