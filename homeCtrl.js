angular.module('apiApp').controller('homeCtrl', function($scope, servy){

    var tableData = [
        ];

    var bigMac = servy.bigMac;
    $scope.hide = true;
    $scope.hideHelpBox = true;
    $scope.hideTableBox = false;

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
            console.log(tableData[j][1]);
            // console.log(currency['USD' + tableData[j][1]]);
            
            if (!currency['USD' + tableData[j][1]] || !bigMac[tableData[j][0]]) {
                tableData.splice(tableData.indexOf(tableData[j]), 1);
                j--;
            } else {
                tableData[j].push((currency['USD' + tableData[j][1]]).toString(), bigMac[tableData[j][0]], (-(100 * (5.30-bigMac[tableData[j][0]])/ 5.30).toFixed(2)) + '%');
            }
        } 
 console.log(tableData);
  angular.element(document).ready(function(){
        
          $('#table').DataTable( {
            data: tableData,
            columns: [
                { title: "Country" },
                { title: "Currency" },
                { title: "Exchange Rate"},
                { title: "Big Mac Price"},
                { title: "Currency Valuation"}
            ],
            "order": [[ 4, "asc" ]]
          } );
          
      })

    })
        


        });

        }
 
        $scope.showTut = function(){
            $scope.hide = false;
          }
          $scope.closeTut = function(){
            $scope.hide=true;
          }
          $scope.showTable = function(){
            $scope.hideTableBox = true;
          }
          $scope.hideTable = function(){
            $scope.hideTableBox = true;
          }

});