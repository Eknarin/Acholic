'use strict';

angular.module('acholic')
  .controller('CompareCtrl',['$scope','Compare','PackageItem',function ($scope , Compare ,PackageItem) {

  	$scope.comparePackage =  Compare.getCompare();
  	$scope.loadItem = false;
    $scope.raftingItem = [];
    $scope.divingItem = [];
    $scope.chooseType = 'PackageRafting';

    // Chart style
    var chartStyle = {     
      "labels": ["Age","Rating","Level","StageAmount"], 
      "colors": [{ // default
        "fillColor": "rgba(255, 153, 153, 0.4)",
        "strokeColor": "rgba(207,100,103,1)",
        "pointColor": "rgba(220,220,220,1)",
        "pointStrokeColor": "#fff",
        "pointHighlightFill": "#fff",
        "pointHighlightStroke": "rgba(151,187,205,0.8)"
      }] };
    $scope.packageChartStyle = chartStyle;

    if($scope.comparePackage.length > 0)
    	PackageItem.list({items: $scope.comparePackage}).$promise.then(function(res){
    		$scope.comparePackage.items = res;
        for (var i = 0; i < res.length; i++) {
          if(res[i].package_type == 'PackageRafting'){           
            $scope.raftingItem.push(res[i]);
          }
          else if(res[i].package_type == 'PackageDiving'){
            $scope.divingItem.push(res[i]);
          }
        };
        $scope.packages = $scope.raftingItem;
        console.log($scope.comparePackage.items);
        console.log("----------------");
        console.log($scope.raftingItem);
        console.log("----------------");
        console.log($scope.divingItem);

    		$scope.loadItem = true;        
        $scope.prepareRaftingData();
    	});  
    
  $scope.currentChoose = "PackageRafting";
  $scope.choose = function(type){
    if(type == 'PackageRafting'){
      $scope.packages = $scope.raftingItem;
      $scope.currentChoose = "PackageRafting";
    }
    else if(type == 'PackageDiving'){
      $scope.packages = $scope.divingItem;
      $scope.currentChoose = "PackageDiving";
    }  
    $scope.prepareData();
  };

  $scope.prepareRaftingData = function(){
    var dataPicking = new Array($scope.raftingItem.length);
    for(var i = 0; i < $scope.raftingItem.length; i++){     
        var temp = {
          age : 0,
          rating : 0,
          level : 0,
          stage : 0
        };   
        // Age
        temp.age = $scope.findAge($scope.raftingItem[i].map_id.map_id.age_limit);      
        // Rating
        temp.rating = parseInt($scope.raftingItem[i].rating);
        // Level
        temp.level = parseInt($scope.findLevel($scope.raftingItem[i].map_id.map_id.level));
        // Stage Amount
        temp.stage = parseInt($scope.raftingItem[i].map_id.map_id.stages_amount);
        
        dataPicking[i] = temp;
    }
    $scope.raftingGraphDatas = dataPicking;
  };

  $scope.prepareDivingData = function(){

  };

  $scope.findAge = function(value){    
    if(value == null)
      return 0;
    else
      return value;
  };
  $scope.findLevel = function(value){
    return parseInt(value.substring(5));
  };

  $scope.rate = 0;
  $scope.getStar = function(num) {
    if(num == null){
      $scope.rate = 0;
    }
    else{     
      $scope.rate = num;
    }
    return new Array(Math.floor($scope.rate));   
  };

  $scope.Math = window.Math;
    $scope.yStar = 0;

  $scope.getWhite = function(val){
    if(val == null){
      $scope.yStar = 0;
    }
    else{
      $scope.yStar = Math.round(val);
    }
    return new Array(5-$scope.yStar);
  };

  $(".toggler").click(function(e){
      e.preventDefault();
      $('.show'+$(this).attr('data-prod')).toggle();
  });

  $scope.rotateRiv = function(){
    $('#expandButtriv').toggleClass('rotate-90deg');
  };

  $scope.rotateStage = function(){
    $('#expandButtstage').toggleClass('rotate-90deg');
  };

  $scope.rotateMore = function(){
    $('#expandButtmore').toggleClass('rotate-90deg');
  };

  


  }]);
