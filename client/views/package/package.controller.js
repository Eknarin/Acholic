'use strict';

angular.module('acholic')
  .controller('PackageCtrl',['$scope','PackageItem','$location' ,'itemData','$rootScope','Bookmark',function ($scope , PackageItem , $location , itemData ,$rootScope , Bookmark) {
  
  $scope.packages = itemData.docs;  
  $scope.maxSize = 5;
  $scope.limit = itemData.limit;
  $scope.totalItems = itemData.total;
  $scope.currentPage = itemData.page;
  $scope.user = $rootScope._user;
  $scope.bookmarks = [];
  $scope.loading = false;

  if($scope.user._id){
    Bookmark.query({q: $scope.user._id}).$promise.then(function(res){
      $scope.bookmarks = res;
      //
      console.log($scope.bookmarks[0]);
      $scope.checkComment();
      $scope.loading = true;
    });
  } else{
     $scope.loading = false;
  }

  $scope.checkComment = function(){
    for(var i = 0 ; i<$scope.packages.length ;i++){
      for(var j = 0; j<$scope.bookmarks.length ;j++){
        if(!$scope.packages[i].bookmark)
          if($scope.packages[i]._id == $scope.bookmarks[j].packageId)
            $scope.packages[i].bookmark = $scope.bookmarks[j];
      }
    }
  };

  //
  $scope.checkBookmark = function(packid){
    for(var i = 0; i < bookmarks.length; i++){
      if(packid == bookmarks[i].packageId._id){
            return true;
            break;
      }
    }
    return false;
  };

  //
  console.log("My bookmarks out"+$scope.loading);
  console.log($scope.bookmarks);


  // $scope.createDate = [];
  $scope.like = function(packageId){
    console.log(packageId.bookmark);
    //if this bookmark's already exist then unbookmark
    if(packageId.bookmark != null){
      packageId.bookmark.$delete().then(function(res){
        packageId.bookmark = null;
        console.log('unlike');
      });
    }
    else{
        $scope.item = new Bookmark;
        $scope.item.bookmark = packageId;
        $scope.item.user = $scope.user._id;
        $scope.item.$save().then(function(res){
         packageId.bookmark = res;
         console.log('like');
        });
    }
  };
  // get package create date
  $scope.getCreateDate = function(timeStamp){
    //console.log("get Create date "+timeStamp);
    $scope.temp = new Date(timeStamp);
    $scope.createDate = $scope.temp.getDate() + "/" + ($scope.temp.getMonth() + 1) + "/" + $scope.temp.getFullYear();
    //console.log($scope.createDate);
    return $scope.createDate;
  }

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    //console.log($scope.currentPage);
    PackageItem.query({q: $location.search().q , page: $scope.currentPage}).$promise.then(function(result){
      //console.log(result);
      $scope.packages = result.docs;
    });
    //PackageItem.query()
  };


	$scope.slider = {
	  min: 0,
	  max: 10000,
	  options: {
	    floor: 0,//should find min price of package
	    ceil: 10000//should find max price of package
	  }
	};

  $scope.rate = 0;

  $scope.filtering = function(){
    $scope.filter = {};
    $scope.filter.priceMin = $scope.slider.min;
    $scope.filter.priceMax = $scope.slider.max;
    $scope.filter.location = $scope.selected;
    $scope.filter.tag = $scope.selectedType;
    $scope.filter.people = $scope.guest;
    $scope.packages = PackageItem.filter($scope.filter);
    //console.log($scope.filter);
  };
  
  $scope.getStar = function(num) {
    if(num == null){
      $scope.rate = 0;
    }
    else{
      $scope.rate = num/2;
    }
        
	    return new Array(Math.floor($scope.rate));   
	};
	
	$scope.rotate = function(){
		$('#expandButt').toggleClass('rotate-180deg');
  };

  //province filter
  $scope.provinces = [
    {name: 'กรุงเทพมหานคร'},
    {name: 'กระบี่'},
    {name: 'กาญจนบุรี'},
    {name: 'กาฬสินธุ์'},
    {name: 'กำแพงเพชร'},
    {name: 'ขอนแก่น'},
    {name: 'จันทบุรี'},
    {name: 'ฉะเชิงเทรา'},
    {name: 'ชลบุรี'},
    {name: 'ชัยนาท'},
    {name: 'ชัยภูมิ'},
    {name: 'ชุมพร'},
    {name: 'เชียงราย'},
    {name: 'เชียงใหม่'},
    {name: 'ตรัง'},
    {name: 'ตราด'},
    {name: 'ตาก'},
    {name: 'นครนายก'},
    {name: 'นครปฐม'},
    {name: 'นครพนม'},
    {name: 'นครราชสีมา'},
    {name: 'นครศรีธรรมราช'},
    {name: 'นครสวรรค์'},
    {name: 'นนทบุรี'},
    {name: 'นราธิวาส'},
    {name: 'น่าน'},
    {name: 'บึงกาฬ'},
    {name: 'บุรีรัมย์'},
    {name: 'ปทุมธานี'},
    {name: 'ประจวบคีรีขันธ์'},
    {name: 'ปราจีนบุรี'},
    {name: 'ปัตตานี'},
    {name: 'พระนครศรีอยุธยา'},
    {name: 'พังงา'},
    {name: 'พัทลุง'},
    {name: 'พิจิตร'},
    {name: 'พิษณุโลก'},
    {name: 'เพชรบุรี'},
    {name: 'เพชรบูรณ์'},
    {name: 'แพร่'},
    {name: 'พะเยา'},
    {name: 'ภูเก็ต'},
    {name: 'มหาสารคาม'},
    {name: 'มุกดาหาร'},
    {name: 'แม่ฮ่องสอน'},
    {name: 'ยะลา'},
    {name: 'ยโสธร'},
    {name: 'ร้อยเอ็ด'},
    {name: 'ระนอง'},
    {name: 'ระยอง'},
    {name: 'ราชบุรี'},
    {name: 'ลพบุรี'},
    {name: 'ลำปาง'},
    {name: 'ลำพูน'},
    {name: 'เลย'},
    {name: 'ศรีสะเกษ'},
    {name: 'สกลนคร'},
    {name: 'สงขลา'},
    {name: 'สตูล'},
    {name: 'สมุทรปราการ'},
    {name: 'สมุทรสงคราม'},
    {name: 'สมุทรสาคร'},
    {name: 'สระแก้ว'},
    {name: 'สระบุรี'},
    {name: 'สิงห์บุรี'},
    {name: 'สุโขทัย'},
    {name: 'สุพรรณบุรี'},
    {name: 'สุราษฎร์ธานี'},
    {name: 'สุรินทร์'},
    {name: 'หนองคาย'},
    {name: 'หนองบัวลำภู'},
    {name: 'อ่างทอง'},
    {name: 'อุดรธานี'},
    {name: 'อุทัยธานี'},
    {name: 'อุตรดิตถ์'},
    {name: 'อุบลราชธานี'},
    {name: 'อำนาจเจริญ'}
  ];
  $scope.selected = " Location ";
  $scope.setProvince = function(value){
    console.log(value);
    $scope.selected = value;
  }

  //type filter
  $scope.types = [
    {name: 'ดำน้ำ'},
    {name: 'ล่องแก่ง'},
    {name: 'ปีนเขา'}
  ];
  $scope.selectedType = " Tag "
  $scope.setType = function(value){
    $scope.selectedType = value;
  };

  //guest filter
  $scope.guests = [
    {n: 1},
    {n: 2},
    {n: 3},
    {n: 4},
    {n: 5}
  ];
  $scope.guest = $scope.guests[0].n;
  $scope.setGuest = function(value){
    $scope.guest = value;
  };

  $scope.Math = window.Math;
  $scope.yStar = 0;

  $scope.getWhite = function(val){
    if(val == null){
      $scope.yStar = 0;
    }
    else{
      if((val/2)%1 == 0){
        $scope.yStar = Math.floor(val/2);
      } else{
        if(((val)/2)%1 >= 0.5){
          $scope.yStar = Math.floor(val/2)+1;
        }else{
          $scope.yStar = Math.floor(val/2);
        }
      }
    }
    return new Array(5-$scope.yStar);
  };

  }]);
