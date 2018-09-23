(function(){
  var isoCode = window.location.pathname.split('/')[2];
  var apiUrl = `http://localhost:3000/api/${isoCode}`;

  if(!isoCode) return alert('No se ingreso ningún código ISO');

  $.get(apiUrl, function(data) {
    fetchData('country', data.country);
    fetchData('population', data.population);
    fetchData('capital', data.capital);
    fetchData('flag', data.flag);
    fetchData('continent', data.continent);
    fetchData('currency', data.currency);
    fetchData('daily', data.weather.main);
    fetchData('temp', data.weather.temp);
    fetchData('pressure', data.weather.pressure);
    fetchData('humidity', data.weather.humidity);
  });

  function fetchData(field, value) {
    if(field === 'flag') {
        $('#' + field).attr('src', value);
    } else {
      $('#' + field).html(value);
    }
  }
})();
