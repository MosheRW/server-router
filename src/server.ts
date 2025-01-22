const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require( 'cors');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Load the apps configuration from JSON
const appsConfig = require('../assets/apps.json');

// Serve each React app based on the configuration
appsConfig.forEach((appConfig) => {
  const { route, buildPath } = appConfig;

  if (fs.existsSync(buildPath)) {
    // Serve the static files for the React app
    app.use(route, express.static(buildPath));

    // Catch-all handler to serve the React app for any route under this path
    app.get(`${route}/*`, (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });

    console.log(`Serving ${route} from ${buildPath}`);
  } else {
    console.warn(`Build path for ${route} does not exist: ${buildPath}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});