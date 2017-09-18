angular.module('apiApp').service('servy', function($http){
    this.getData = function(search) {
        return $http.get("https://restcountries-v1.p.mashape.com/name/" + search + "?mashape-key=4BQ7Mb2NUZmshWPDaG3fNcevzxjGp1wVXcQjsnbp85E8Cqeyf0")
        .then(function(response){
           
            
            return response.data;
        });
      };
    
    this.getCurrency = function(){
        return $https.get("https://www.apilayer.net/api/live?access_key=eb9d4a0195390ab516467ad357ca4014")
        .then(function(response){
            return response.data;
        })
    }

    this.getInfo = function(){
        return $http.get("https://restcountries-v1.p.mashape.com/all/?mashape-key=4BQ7Mb2NUZmshWPDaG3fNcevzxjGp1wVXcQjsnbp85E8Cqeyf0")
        .then(function(response){
            return response.data;
        });
    }

    this.getWeather = function(lat, lng){
        return $http.get("https://api.worldweatheronline.com/premium/v1/weather.ashx?key=2a0d3ef4b76045b381e205225171609&q=" + lat + "," + lng + "&format=json")
        .then(function(response){
            //console.log(response);
            this.data = response.data.data.current_condition[0];
            return this.data;
        });
    }

    this.bigMac = bigMac;

});

var bigMac = {
    Ukraine: 1.70,
    Egypt: 1.75,
    Malaysia: 2,
    'South Africa': 2.26,
    Taiwan: 2.26,
    Russia: 2.28,
    Indonesia: 2.40,
    'Hong Kong': 2.46,
    Vietnam: 2.64,
    Philippines: 2.65,
    Poland: 2.72,
    Mexico: 2.75,
    India: 2.76,
    China: 2.92,
    Turkey: 3.01,
    'Saudi Arabia': 3.20,
    Hungary: 3.21,
    Peru: 3.23,
    Colombia: 3.24,
    'Czech Republic': 3.28,
    Japan: 3.36,
    Thailand: 3.50,
    Pakistan: 3.57,
    'Sri Lanka': 3.77,
    UAE: 3.81,
    'South Korea': 3.84,
    Chile: 3.84,
    'Costa Rica': 4,
    Venezuela: 4.06,
    Singapore: 4.06,
    Britain: 4.11,
    Argentina: 4.13,
    'New Zealand': 4.43,
    Germany: 4.47,
    Spain: 4.47,
    France: 4.47,
    Greece: 4.47,
    Austria: 4.47,
    Belgium: 4.47,
    Italy: 4.47,
    Australia: 4.53,
    Uruguay: 4.53,
    Denmark: 4.61,
    Israel: 4.77,
    Brazil: 5.10,
    Sweden: 5.82,
    Norway: 5.91,
    Switzerland: 6.74,
    US: 5.30,
    Canada: 4.66
}
