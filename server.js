const express = require('express');
const fetch = require('node-fetch');
const app = express();
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

app.get('/country/:country_name', (req, res) => {
  const url = 'https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/' +
            'rest/services/Cases_by_country_Plg_V3/FeatureServer/0/query';
  const params = 'f=json&where=1=1&returnGeometry=False' +
                 '&spatialRel=esriSpatialRelIntersects' +
                 '&outFields=*&orderByFields=cum_conf desc&cacheHint=true';
  const country = req.params.country_name.toLowerCase();

  fetch(`${url}?${params}`)
    .catch(err => res.send(err))
    .then(res => res.json())
    .catch(err => res.send(err))
    .then(data => {
      data.features.forEach(countryData => {
        const countryName = countryData.attributes['ADM0_NAME'];

        if (countryName &&
            countryName.toLowerCase() === country) {
          res.send(countryData.attributes);
        }
      })
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
