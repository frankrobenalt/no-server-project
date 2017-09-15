angular.module('apiApp').controller('pppCtrl', function($scope, servy){
    $scope.bigMac = servy.bigMac;
    $scope.ukraine = 'ukraine';
    $scope.egypt = 'egypt';
    $scope.malaysia = 'malaysia';
    $scope.southAfrica = 'south africa';
    $scope.russia = 'russia';

    angular.element(document).ready(function(){
        var lat = 39.758808;
        var lng = -101.908424;
        var cont = "<div class='words'>United States" +  
        "<br>U.S Big Mac Price: $5.30"
        "</div>";
        initMapTwo(lat, lng, cont);
      });

      $scope.hideHelpBox = true;

    $scope.getData = function(search){
          servy.getData(search).then(function(response){
            $scope.country = response[0].name;
            $scope.currency = response[0].currencies[0];
           

            $scope.content = "<div class='words'>" + $scope.country + "<br>" +
            "U.S Big Mac Price: $5.30<br>" + 
            $scope.country + " Big Mac Price: $" + $scope.bigMac[$scope.country] +
            "<br>Savings per Big Mac in " + $scope.country + ": $" + (5.30 - $scope.bigMac[$scope.country]).toFixed(2) + 
            "</div>";
            
            console.log(($scope.bigMac[$scope.country]));
            initMapTwo(response[0].latlng[0], response[0].latlng[1], $scope.content);

            });
         $scope.searchTerm = '';
    };

    $scope.showHelp = function(){
      $scope.hideHelpBox = false;
    }
    $scope.hideHelp = function(){
      $scope.hideHelpBox = true;
    }
    
   
});

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
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: search,
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
      console.log('idle');
        infowindow.open(map, marker);
    });
};