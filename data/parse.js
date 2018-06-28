const path = require('path');
const fs = require('fs');

console.log('started...');

// ref lufthansa
const inputFiles = [
  path.join(__dirname, 'airports-0100.json'),
  path.join(__dirname, 'airports-0200.json'),
  path.join(__dirname, 'airports-0300.json'),
  path.join(__dirname, 'airports-0400.json'),
  path.join(__dirname, 'airports-0500.json'),
  path.join(__dirname, 'airports-0600.json'),
  path.join(__dirname, 'airports-0700.json'),
  path.join(__dirname, 'airports-0800.json'),
  path.join(__dirname, 'airports-0900.json'),
  path.join(__dirname, 'airports-1000.json'),
  path.join(__dirname, 'airports-1100.json'),
  path.join(__dirname, 'airports-1200.json'),
  path.join(__dirname, 'airports-1300.json'),
];

let langCode = 'en';
const outputFile = path.join(__dirname, 'airports.json');

let outputArr = [];

inputFiles.forEach((inputFile) => {
  read_parse_write(inputFile, outputFile, langCode);
});

// write updated output array
console.log('writing output: ' + outputFile + '...');
fs.writeFileSync(outputFile, JSON.stringify(outputArr));
console.log('writing output: ' + outputFile + '... done');

console.log('end.');

function read_parse_write(inputFile, outputFile, langCode = 'en'){
  console.log('reading input: ' + inputFile + ' ...');

  // read a batch of raw airport records
  let inputData = fs.readFileSync(inputFile);
  console.log('reading input: ' + inputFile + ' ... done');

  let inputJson = JSON.parse(inputData);
  let airports = inputJson.AirportResource.Airports.Airport;

  console.log('  parsing airports ...');
  airports.forEach((airport) => {
    let parsedAirport = parseAirport(airport, langCode);
    outputArr.push(parsedAirport);// side effect
  });
  console.log('  parsing airports ... done');
}

function parseAirport(airport, langCode = 'en'){
  return {
    code:         airport.AirportCode,
    name:         findAirportName(airport, langCode),
    country_code: airport.CountryCode,
    city_code:    airport.CityCode,
    type:         airport.LocationType,
    lat:          findAirportLat(airport),
    lon:          findAirportLon(airport),
    tz_offset:    airport.UtcOffset,
    tz_name:      airport.TimeZoneId,
  };
}

function findAirportName(airport, langCode = 'en'){
  let name = null;
  try {
    let names = airport.Names.Name;
    if ((typeof names === 'object') && ('@LanguageCode' in names)) {
      name = names['$'];
    } else {// array
      airport.Names.Name.forEach((row) => {
        if (row['@LanguageCode'] === langCode) {
          name = row['$'];
        }
      });
    }
  } catch (err) {
    console.log('err message: ', err);
    console.log('err airport', airport);
  }

  if (!name && langCode === 'en') {
    findAirportName(airport, 'xx');// try another language code
  }

  return name;
}

function findAirportLat(airport){
  let lat = null;
  try {
    if ('Position' in airport) {
      lat = airport.Position.Coordinate.Latitude;
    }
  } catch (err) {
    console.log('err message: ', err);
    console.log('err airport', airport);
  }
  return lat;
}

function findAirportLon(airport){
  let lon = null;
  try {
    if ('Position' in airport) {
      lon = airport.Position.Coordinate.Longitude;
    }
  } catch (err) {
    console.log('err message: ', err);
    console.log('err airport', airport);
  }
  return lon;
}
