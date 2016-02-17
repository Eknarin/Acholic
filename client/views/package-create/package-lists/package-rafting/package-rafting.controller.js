'use strict';

angular.module('acholic')
  .controller('PackageRaftingCtrl',['$scope','packageData','PackageItem','$location',function ($scope ,packageData, PackageItem ,$location) {
    $scope.packages = packageData;
    $scope.packages.info = [];
    $scope.images = [];

    $scope.onSubmit = function(){
        $scope.packages.$save().then(function(){
             $location.path("/package");
        });
    };

 	var navListItems = $('ul.setup-panel li a'),
    allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function(e)
    {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');
        
        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });
    
    $('ul.setup-panel li.active a').trigger('click');
    
    // DEMO ONLY //
    $('#activate-step-2').on('click', function(e) {
        $('ul.setup-panel li:eq(1)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
        $(this).remove();
    })  

  }]);

