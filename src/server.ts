const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;


/** Serve static files from  assets/apps.json */
const appsConfig = require('../assets/apps.json');
const detailsConfig = require('../assets/details.json');

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
/** home page handler */
app.get('/', (req, res) => {

  const homePage = fs.readFileSync(path.join(__dirname, '../assets/homePage.html'), 'utf8');
  const homePageWithLinks = homePage
    .replace('<ul id="list"></ul>',
      ['<ul id="list">',
        (appsConfig
          .filter((appConfig) => appConfig.display)
          .map((appConfig) => `<li><a href="${appConfig.route}">${appConfig.description}</a></li>`)
          .join('</br>')),
        '</ul>'].join(''))
    .replace('{{title}}', detailsConfig?.title || '')
    .replace('{{h1}}', detailsConfig?.h1 || '')
    .replace('{{h2}}', detailsConfig?.h2 || '')
    .replace('{{github}}', `"${detailsConfig?.github}"`)
    .replace('{{linkdin}}', `"${detailsConfig?.linkdin}"`);

  res.send(homePageWithLinks);
});

/** 404 handler */
app.all('*', (req, res) => {
  const page404 = fs.readFileSync(path.join(__dirname, '../assets/homePage.html'), 'utf8');
  const page404WithLinks = page404
    .replace('{{webName}}', detailsConfig?.webName)
    .replace('{{webPath}}', `"${req.url}"`)
    .replace('{{github}}', `"${detailsConfig?.github}"`)
    .replace('{{linkdin}}', `"${detailsConfig?.linkdin}"`);

  res.status(404).send(page404WithLinks);
});

app.all('apps.json', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../assets/apps.json'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

