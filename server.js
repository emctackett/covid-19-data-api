const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 4000;

app.all('*', (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/state/:state_name', (req, res) => {
  const cdcDataDump = 'http://www.cdc.gov/coronavirus/2019-ncov/map-cases-us.json';
  const state = req.params.state_name.toLowerCase();

  fetch(cdcDataDump)
    .then(res => res.json())
    .catch(err => {
      res.send(err);
    })
    .then(data => {
      data.data.forEach(stateData => {
        const jurisdiction = stateData['Jurisdiction'];

        if (jurisdiction &&
            jurisdiction.toLowerCase() === state) {
          res.send(stateData);
        }
      })
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
