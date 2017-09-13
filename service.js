angular.module('apiApp').service('servy', function($http){
    this.getData = function(search) {
        return $http.get("https://restcountries-v1.p.mashape.com/name/" + search + "?mashape-key=4BQ7Mb2NUZmshWPDaG3fNcevzxjGp1wVXcQjsnbp85E8Cqeyf0")
        .then(function(response){
            console.log(response);
            var centerObj = response.data[0].latlng;
            var country = response.data[0].name;
            var currency = response.data[0].currencies[0];
            var content = "<div class='words'>" +
            country + "<br>" +
            "Currency: " + currency + "<br>" + 
            "$1000USD = {{total}}"
            "</div>";
            initMap(centerObj[0],centerObj[1], content);
            
            return response.data;
        });
      };
    
    this.getCurrency = function(){
        return $http.get("http://api.fixer.io/latest?base=USD")
        .then(function(response){
            return response.data;
        })
    }
});


function initMap(lat, lng, content) {
  var search = {lat: lat, lng: lng};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: search
  });

var contentString = content;

var infowindow = new google.maps.InfoWindow({
    content: contentString
});

  var marker = new google.maps.Marker({
    position: search,
    map: map
  });
  marker.addListener('click', function(){
      infowindow.open(map, marker);
  });
}

var lat = 32.7767;
var lng = -96.7970;
initMap(lat, lng);