angular.module('apiApp').controller('pppCtrl', function($scope, $timeout, servy){
    $scope.bigMac = servy.bigMac;





    angular.element(document).ready(function(){
        var lat = 39.758808;
        var lng = -101.908424;
        var cont = "<div class='words'>United States" +  
        "<br>U.S Big Mac Price: $5.30"
        "</div>";
        initMapTwo(lat, lng, cont);
      });

      $scope.timeout = true;

      $timeout(function(){
        $scope.timeout = false;
        $scope.afterTimeout = true;
      }, 4000);
      
      $scope.hideHelpBox = false;
      
      $scope.toggleWeather = function(){
        if ($scope.showWeather == true) {
          $scope.showWeather = false;
        } else {
        $scope.showWeather = true;
      }
      }
      
      $scope.names=[];
      $scope.randomSearch = function(){
        return $scope.names[Math.floor(Math.random() * 47)];
      }
      console.log($scope.names);
      var tableData = [];
      var newSearch = [];

      $scope.getInfo = function(){
        servy.getInfo()
        .then(function(response){
            for (var i=0; i<response.length; i++){
                tableData.push([response[i].name]);
               
                }
      
            servy.getCurrency()
        .then(function(response){
        var currency = response.quotes;
        
        for (var j = 0; j<tableData.length; j++){
            // console.log(tableData[j][1]);
            // console.log(currency['USD' + tableData[j][1]]);
            
            if (!bigMac[tableData[j][0]]) {
                tableData.splice(tableData.indexOf(tableData[j]), 1);
                j--;
            } else {
                tableData[j].push(bigMac[tableData[j][0]], (-(100 * (5.30-bigMac[tableData[j][0]])/ 5.30).toFixed(2)) + '%');
                $scope.names.push(tableData[j][0]);
            }
        }
      angular.element(document).ready(function(){
        
          $('#table').DataTable( {
            data: tableData,
            columns: [
                { title: "Country" },
                { title: "Big Mac Price"},
                { title: "Currency Valuation"}
            ],
            "order": [[ 2, "asc" ]]
          } );
          $('#table tbody').on('click', 'tr', function () {
            newSearch.push(this.firstChild.textContent);
            $scope.getData(newSearch);
            newSearch = [];
        } );
      })
      
      })
      
      $scope.getData = function(search){
          servy.getData(search).then(function(response){
            $scope.country = response[0].name;
            $scope.currency = response[0].currencies[0];
            $scope.difference = (5.30 - $scope.bigMac[$scope.country]).toFixed(2);
           
            if ($scope.difference < 0){
            $scope.content = "<div class='words'>" + $scope.country + "<br>" +
            "U.S Big Mac Price: $5.30<br>" + 
            $scope.country + " Big Mac Price: $" + $scope.bigMac[$scope.country] +
            "<br>Price Difference: <div class='red'>$" + $scope.difference + 
            "</div></div>";
           } else {
            $scope.content = "<div class='words'>" + $scope.country + "<br>" +
            "U.S Big Mac Price: $5.30<br>" + 
            $scope.country + " Big Mac Price: $" + $scope.bigMac[$scope.country] +
            "<br>Price Difference: <div class='green'>$" + $scope.difference + 
            "</div></div>";
           }
           initMapTwo(response[0].latlng[0], response[0].latlng[1], $scope.content);

          servy.getWeather(response[0].latlng[0], response[0].latlng[1])
           
                       .then(function(response){
                         
                         $scope.weather = {
                           feelsLike: response.FeelsLikeF,
                           temp: response.temp_F,
                           description: response.weatherDesc[0].value,
                           pic: response.weatherIconUrl[0].value
                         }
                         

           

            });
         $scope.searchTerm = '';
          })
        };

    $scope.showHelp = function(){
      $scope.hideHelpBox = false;
    }
    $scope.hideHelp = function(){
      $scope.hideHelpBox = true;
    }
    
   
});
}
function initMapTwo(lat, lng, content) {

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
    var center = {lat: lat, lng: lng + 30};
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
};
      })
    
  
