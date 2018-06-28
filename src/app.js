const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, 'public');

// serve JSON files
app.use(express.static(publicPath));

const airports = require('./public/en/airports.json');

function airportsByName(airports, name){
  const airportsFiltered = [];

  const nameUp = name.toUpperCase();
  airports.forEach((airport) => {
    if (airport.name.toUpperCase().includes(nameUp)) {
      airportsFiltered.push(airport);
    }
  });

  return airportsFiltered;
}

function airportsByCountryCode(airports, countryCode){
  const airportsFiltered = [];

  const countryCodeUp = countryCode.toUpperCase();
  airports.forEach((airport) => {
    if (airport.country_code.toUpperCase() === countryCodeUp) {
      airportsFiltered.push(airport);
    }
  });

  return airportsFiltered;
}

function airportsByCityCode(airports, cityCode){
  const airportsFiltered = [];

  const cityCodeUp = cityCode.toUpperCase();
  airports.forEach((airport) => {
    if (airport.city_code.toUpperCase() === cityCodeUp) {
      airportsFiltered.push(airport);
    }
  });

  return airportsFiltered;
}

app.get('/api/airports', function (req, res) {
  let { name, country, city } = req.query;

  if (name && name !== '') {

    let airportsFiltered = airportsByName(airports, name);
    res.json({ data: airportsFiltered });

  } else if (country && country !== '') {

    let airportsFiltered = airportsByCountryCode(airports, country);
    res.json({ data: airportsFiltered });

  } else if (city && city !== '') {

    let airportsFiltered = airportsByCityCode(airports, city);
    res.json({ data: airportsFiltered });

  } else {
    res.json({ data: airports });
  }
});

app.get('/api/airports/:code', function (req, res) {
  const { code } = req.params;
  const airport = airports.find((row) => {
    return row.code === code;
  });
  res.json({ data: airport });
});

module.exports = app;
