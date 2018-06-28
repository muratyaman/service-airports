# Airports
Airports service/API, international airport codes, IATA codes

## Requirements
* Node
* Express

## Run
`node index.js`

Check Postman collection for sample usage.

`GET /api/airports`
`GET /api/airports?name=London`
`GET /api/airports?city=LON`
`GET /api/airports?country=GB`

Sample response:

`
{
    "data": [
        {
            "code": "ELS",
            "name": "East London",
            "country_code": "ZA",
            "city_code": "ELS",
            "type": "Airport",
            "lat": -33.03611111,
            "lon": 27.82388889,
            "tz_offset": 2,
            "tz_name": "Africa/Johannesburg"
        },
        {
            "code": "LCY",
            "name": "London City Airport",
            "country_code": "GB",
            "city_code": "LON",
            "type": "Airport",
            "lat": 51.50527778,
            "lon": 0.055277778,
            "tz_offset": 1,
            "tz_name": "Europe/London"
        },
        {
            "code": "LHR",
            "name": "London Heathrow",
            "country_code": "GB",
            "city_code": "LON",
            "type": "Airport",
            "lat": 51.4775,
            "lon": -0.461388889,
            "tz_offset": 1,
            "tz_name": "Europe/London"
        },
        {
            "code": "STN",
            "name": "London-Stansted",
            "country_code": "GB",
            "city_code": "LON",
            "type": "Airport",
            "lat": 51.88277778,
            "lon": 0.233888889,
            "tz_offset": 1,
            "tz_name": "Europe/London"
        },
        {
            "code": "YXU",
            "name": "London (CA)",
            "country_code": "CA",
            "city_code": "YXU",
            "type": "Airport",
            "lat": 43.03305556,
            "lon": -81.15111111,
            "tz_offset": -4,
            "tz_name": "America/Toronto"
        }
    ]
}
`

Retrieve one airport by code.

`GET /api/airports/LHR`

Sample response:

`
{
    "data": {
        "code": "LHR",
        "name": "London Heathrow",
        "country_code": "GB",
        "city_code": "LON",
        "type": "Airport",
        "lat": 51.4775,
        "lon": -0.461388889,
        "tz_offset": 1,
        "tz_name": "Europe/London"
    }
}
`
