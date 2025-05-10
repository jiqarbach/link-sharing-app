require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => res.send('Express + Hasura Auth & CRUD Backend'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
