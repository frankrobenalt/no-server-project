angular.module('apiApp').controller('ctrl2', function($scope, servy){
$scope.malaysia = 'malaysia';
$scope.southAfrica = 'south africa';
$scope.peru = 'peru';
$scope.mexico = 'mexico';
$scope.japan = 'japan';

$scope.hide = true;

  $scope.getData = function(search) {
$scope.hide = false;
      servy.getData(search).then(function(response){

        var dataObject = {
          country: response[0].name,
          capital: response[0].capital,
          currency: response[0].currencies[0],
          timezone: response[0].timezones[0]
        }
        $scope.data = dataObject;

        servy.getCurrency().then(function(response){
          console.log(response);
        $scope.currency = response.rates;
        
        if (!$scope.currency[$scope.data.currency]){
           $scope.total = '$1000USD'
        } else {
          $scope.total = Math.floor(1000 * ($scope.currency[$scope.data.currency])) + ' ' + $scope.data.currency;
         
        }
      });

      });

      $scope.searchTerm = '';
    }
    
$scope.hideAgain = function(){
  $scope.hide = true;

}
 

});
