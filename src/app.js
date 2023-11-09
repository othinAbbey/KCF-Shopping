const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/auth', authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
