const cleanCapital = (capital) => {
  let cap = capital.replace('á', 'a');
  cap = cap.replace('é', 'e');
  cap = cap.replace('í', 'i');
  cap = cap.replace('ó', 'o');
  return cap.replace('ú', 'u');
};

exports.prepareCountryData = (data) => {
  const parsedData = JSON.parse(data);
  // Genero el objeto resultado de la funcion
  var result = {
    country: parsedData.name,
    population: parsedData.population,
    capital: cleanCapital(parsedData.capital),
    flag: parsedData.flag,
    continent: `${parsedData.region}, ${parsedData.subregion}`,
    currency: parsedData.currencies[0].name
  };

  // Devuelvo el resultado
  return result;
};

exports.prepareWeatherData = (data) => {
  const parsedData = JSON.parse(data);
  // Genero el objeto resultado de la funcion
  var result = {
    weather: {
      ...parsedData.weather[0],
      ...parsedData.main
    }
  };

  // Devuelvo el resultado
  return result;
};
