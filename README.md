# CDC Data COVID-19 API

Retrieve state-specific data from the CDC (updated daily), and country-specific data from the John Hopkins U COVID-19 map.  

A simple node server built with express.

## Usage

Query the API via http://covid-19-data-api.herokuapp.com, using one of the following paths:

### `/state`

Returns an array of objects with state-specific data:

```
[
    {
        "Jurisdiction": "Alabama",
        "Range": "1001 to 5000",
        "Cases Reported": 3803,
        "Community Transmission\ufffd": "Yes, defined area(s)",
        "URL": "http://www.adph.org/"
    },
    {
        "Jurisdiction": "Alaska",
        "Range": "101 to 500",
        "Cases Reported": 277,
        "Community Transmission\ufffd": "Yes, defined area(s)",
        "URL": "http://dhss.alaska.gov/Pages/default.aspx"
    },
  ...
```

### `/state/:state_name`

Returns an object of data for `:state_name` state.

```
// /state/arizona

{
    "Jurisdiction": "Arizona",
    "Range": "1001 to 5000",
    "Cases Reported": 3702,
    "Community Transmission\ufffd": "Yes, widespread",
    "URL": "http://www.azdhs.gov/"
}
```

### `/country`

Returns an array of objects specific to each country.

```
// /country

[
    {
        "attributes": {
            "ADM0_NAME": "United States of America",
            "ADM1_NAME": null,
            "DateOfReport": 1586649600000,
            "DateOfDataEntry": 1586736000000,
            "new_conf": null,
            "new_clin": null,
            "new_susp": null,
            "new_death": null,
            "cum_conf": 524514,
            ....
        }
    },
    {
        "attributes": {
            "ADM0_NAME": "Spain",
            "ADM1_NAME": null,
            "DateOfReport": 1586649600000,
            "DateOfDataEntry": 1586736000000,
            "new_conf": null,
            "new_clin": null,
            "new_susp": null,
            "new_death": null,
            "cum_conf": 161852,
            ....
        }
        .....
    },
    .....
  ]
```

### `/country/:country_name`

Returns an object containing data for `:country_name` country.

```
// /country/germany

{
    "ADM0_NAME": "Germany",
    "ADM1_NAME": null,
    "DateOfReport": 1586649600000,
    "DateOfDataEntry": 1586736000000,
    "new_conf": null,
    "new_clin": null,
    "new_susp": null,
    "new_death": null,
    "cum_conf": 120479,
    "cum_clin": null,
    "cum_susp": null,
    "cum_death": 2673,
  ....
}
```

## Built With
- node.js
- Express
- Hosted on Heroku

## Work Locally

- Clone the respository
- `npm install`
- `npm start`
