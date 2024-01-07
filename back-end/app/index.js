const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// Importer les routes
const userRoutes = require('./routes');

// Utiliser les routes importées
app.use('/', userRoutes);

app.listen(port, () => console.log(`Magic happens on port ${port}`));
