const express = require ('express');
const https = require ('https');
const http = require ('http');
const app = express();
const path = require('path');
const transform = require('./parse');

let response;

const sourceMap = {
	country: {
		url: (param) => `https://restcountries.eu/rest/v2/alpha/${param}`,
		http: https,
		prepareData: transform.prepareCountryData,
		resultData: {}
	},
	weather: {
		url: (param) => `http://api.openweathermap.org/data/2.5/weather?APPID=f3939b53fd5fc42fad2ad41876e41c93&q=${param}`,
		http: http,
		prepareData: transform.prepareWeatherData,
		resultData: {}
	}
};

const getCountryData = (src, input) => {
	let source = sourceMap[src];
	let data = '';
	let http = source.http;
	let execute = (res) => {
		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			source.resultData = source.prepareData(data);
			getWeatherData('weather', source.resultData.capital);
		});
	};

	http.get(source.url(input), execute).end();
};

const getWeatherData = (src, input) => {
	let source = sourceMap[src];
	let data = '';
	let http = source.http;
	let execute = (res) => {
		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			source.resultData = source.prepareData(data);
			const finalResult = {
				...sourceMap.country.resultData,
				...sourceMap.weather.resultData
			};
			response.json(finalResult);
		});
	};

	http.get(source.url(input), execute);
};

app.get('/api/:isoCode', function (req, res) {
	getCountryData('country', req.params.isoCode);
	response = res;
});

app.get('/index(|/*)', function(req, res) {
  res.sendFile(path.join(__dirname + '/assets/index.html'));
});

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(3000);
