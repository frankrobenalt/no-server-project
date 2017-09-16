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
$scope.hideHelpBox = true;
$scope.hideTableBox = false;


var tableData = [
];
var newSearch = [];
$scope.getInfo = function(){
  servy.getInfo()
  .then(function(response){
      for (var i=0; i<response.length; i++){
          tableData.push([response[i].name, response[i].currencies[0]]);
          }

      servy.getCurrency()
  .then(function(response){
  var currency = response.quotes;
  
  for (var j = 0; j<tableData.length; j++){
      // console.log(tableData[j][1]);
      // console.log(currency['USD' + tableData[j][1]]);
      
      if (!currency['USD' + tableData[j][1]] || !bigMac[tableData[j][0]]) {
          tableData.splice(tableData.indexOf(tableData[j]), 1);
          j--;
      } else {
          tableData[j].push((currency['USD' + tableData[j][1]]).toString(), bigMac[tableData[j][0]], (-(100 * (5.30-bigMac[tableData[j][0]])/ 5.30).toFixed(2)) + '%');
      }
  } 
angular.element(document).ready(function(){
  
    $('#table').DataTable( {
      data: tableData,
      columns: [
          { title: "Country" },
          { title: "Currency" },
          { title: "Exchange Rate"}
      ],
      "order": [[ 2, "desc" ]]
    } );
    $('#table tbody').on('click', 'tr', function () {
      console.log(this);
      newSearch.push(this.firstChild.textContent);
      console.log(newSearch);
      $scope.getData(newSearch);
      newSearch = [];
  } );
})

})
  


  });

  }


$scope.getData = function(search) {
      
      servy.getData(search)
      
      .then(function(response){

            var dataObject = {
              country: response[0].name,
              capital: response[0].capital,
              lat: response[0].latlng[0],
              lng: response[0].latlng[1],
              currency: response[0].currencies[0],
              timezone: response[0].timezones[0]
            }
            $scope.data = dataObject;

            servy.getCurrency()
        
        .then(function(response){
        
                $scope.currency = response.quotes;
                
                if (!$scope.currency['USD' + $scope.data.currency]){
                  $scope.total = '1,000 USD'
                } else {
                  $scope.total = Math.floor(1000 * $scope.currency['USD' + $scope.data.currency]); 
                }
                if ($scope.total > 999){
                  $scope.total = $scope.total.toLocaleString();
                }

                $scope.content = "<div class='words'>" +
                $scope.data.country + "<br>" +
                "Currency: " + $scope.data.currency + "<br>" + 
                "1,000 USD = " + $scope.total + ' ' + $scope.data.currency + 
                "</div>";
      

        initMap($scope.data.lat,$scope.data.lng, $scope.content);
        });

      });

      $scope.searchTerm = '';
    }
    
 
$scope.showTut = function(){
  $scope.hide = false;
}
$scope.closeTut = function(){
  $scope.hide=true;
}
$scope.showHelp = function(){
  $scope.hideHelpBox = false;
}
$scope.hideHelp = function(){
  $scope.hideHelpBox = true;
}
$scope.showTable = function(){
  $scope.hideTableBox = true;
}
$scope.hideTable = function(){
  $scope.hideTableBox = true;
}

});

function initMap(lat, lng, content) {

  var styledMapType = new google.maps.StyledMapType(
    [
      {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{color: '#c9b2a6'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{color: '#dcd2be'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ae9e90'}]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#93817c'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{color: '#a5b076'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#447530'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#f5f1e6'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{color: '#fdfcf8'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#f8c967'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#e9bc62'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{color: '#e98d58'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{color: '#db8555'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#806b63'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{color: '#8f7d77'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ebe3cd'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#b9d3c2'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#92998d'}]
      }
    ],
    {name: 'Styled Map'});

  var search = {lat: lat, lng: lng};
  var center = {lat: lat, lng: lng + 25};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center,

    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map']
    }
  });

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

var contentString = content;

var infowindow = new google.maps.InfoWindow({
    content: contentString
});

  var marker = new google.maps.Marker({
    position: search,
    map: map
  });
  map.addListener('tilesloaded', function(){
      infowindow.open(map, marker);
  });
}

