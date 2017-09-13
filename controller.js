angular.module('apiApp').controller('ctrl2', function($scope, servy){
$scope.indonesia = 'indonesia';
$scope.southAfrica = 'south africa';
$scope.southkorea = 'south korea';
$scope.thailand = 'thailand';
$scope.japan = 'japan';



angular.element(document).ready(function(){
  var lat = 39.758808;
  var lng = -101.908424;
  var cont = "<div class='words'>United States" + "<br>" +
  "Currency: USD" + "<br>" + 
  "1,000 USD = 1,000 USD" +
  "</div>";
  initMap(lat, lng, cont);
})


$scope.hide = true;
$scope.initCur = function(){
  servy.getCurrency().then(function(response){
    $scope.curr = response.rates;
  });
};


$scope.getData = function(search) {
      
    $scope.hide = false;

      servy.getData(search).then(function(response){

        var dataObject = {
          country: response[0].name,
          capital: response[0].capital,
          lat: response[0].latlng[0],
          lng: response[0].latlng[1],
          currency: response[0].currencies[0],
          timezone: response[0].timezones[0]
        }
        $scope.data = dataObject;

        servy.getCurrency().then(function(response){
        $scope.currency = response.rates;
        console.log(response);
        
        if (!$scope.currency[$scope.data.currency]){
           $scope.total = '1,000 USD'
        } else {
          $scope.total = Math.floor(1000 * ($scope.currency[$scope.data.currency])) + ' ' + $scope.data.currency; 
        }
        $scope.content = "<div class='words'>" +
      $scope.data.country + "<br>" +
      "Currency: " + $scope.data.currency + "<br>" + 
      "1,000 USD = " + $scope.total +
      "</div>";
      

      initMap($scope.data.lat,$scope.data.lng, $scope.content);
      });

      });

      $scope.searchTerm = '';
    }
    
$scope.hideAgain = function(){
  $scope.hide = true;

}
 

});

function initMap(lat, lng, content) {
  var search = {lat: lat, lng: lng};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
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
  map.addListener('tilesloaded', function(){
    console.log('idle');
      infowindow.open(map, marker);
  });
}

