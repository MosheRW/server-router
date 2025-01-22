const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require( 'cors');
require('dotenv');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;


/** Serve static files from  assets/apps.json */
const appsConfig = require('../assets/apps.json');

appsConfig.forEach((appConfig) => {
  const { route, buildPath } = appConfig;

  if (fs.existsSync(buildPath)) {
    app.use(route, express.static(buildPath));

    app.get(`${route}/*`, (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });

    console.log(`Serving ${route} from ${buildPath}`);
  } else {
    console.warn(`Build path for ${route} does not exist: ${buildPath}`);
  }
});

/** 404 handler */
app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../assets/404.html'));
});

/** home page handler */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/homePage.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});