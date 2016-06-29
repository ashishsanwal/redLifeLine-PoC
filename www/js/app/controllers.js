/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])

    .controller('ListCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.dataList = ["One", "Two", "Three"];


            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };

        }])


	.controller('MapPageCtrl', [
		'$state', '$scope', '$ionicLoading','UserService',   // <-- controller dependencies
		function ($state, $scope, $ionicLoading, UserService) {

		  	$scope.mapCreated = function(map) {
				$scope.map = map;
		  	};

		  	$scope.centerOnMe = function () {
				console.log("Centering");
				if (!$scope.map) {
			  		return;
				}

				$scope.loading = $ionicLoading.show({
			  		content: 'Getting current location...',
			  		showBackdrop: false
				});

				navigator.geolocation.getCurrentPosition(function (pos) {
			  		console.log('Got pos', pos);
			  		$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			  		$scope.loading.hide();
			  		console.log (pos.coords.latitude);
			    	//var marker = new google.maps.Marker({
			        //	map: $scope.map,
			        //	position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
			      	//});
			       	//$scope.markers.push(marker);
				}, function (error) {
			  		alert('Unable to get location: ' + error.message);
				});


			};
		}])


    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


    	}])

	.controller('SearchCtrl', [
		'$scope','AppService',
		function ($scope, AppService) {
			$scope.bloodtype_selectables = [
			"A+","A-","B+","B-","AB+","AB-","O+","O-"
		  	];

		  	$scope.longList  = [];
		  	for(var i=0;i<1000; i++){
				$scope.longList.push(i);
		  	}

		  	$scope.selectableBTNames =  [
				{ name : "A+", role : "A"},
				{ name : "A-", role : "A"},
				{ name : "B+", role : "B"},
				{ name : "B-", role : "B"},
				{ name : "AB+", role : "AB"},
				{ name : "AB-", role : "AB"},
				{ name : "O+", role : "O"},
				{ name : "O-", role : "O"},
		  	];

		  	$scope.someSetModel = 'Mauro';

		  	$scope.getOpt = function(option){
				return option.name + ":" + option.role;
		  	};

		  	$scope.shoutLoud = function(newValuea, oldValue){
				alert("changed from " + JSON.stringify(oldValue) + " to " + JSON.stringify(newValuea));
		  	};

		  	$scope.locateUsers = function(){
				AppService.getUserLocationByBloodType($scope.bloodType)
				   .then(function (_response) {
						// transition to next state
						//uiGmapIsReady.promise().then(function (){});
						var geocoder = new google.maps.Geocoder();
						var marker;
						var latlng;


						var user_loc;
						var location;
						for(var i=0, len=_response.length; i<len; i++) {
							user_loc = _response[i].get("location");
							//alert(user_loc);
							geocoder.geocode( { 'address': user_loc}, function(results, status) {
								location = results[0].geometry.location;
								console.log(location.lat() + '    ' + location.lng());
					            latlng = new google.maps.LatLng(location.lat(), location.lng());
					            marker = new google.maps.Marker({
					                position: new google.maps.LatLng(location.lat(), location.lng()),
					                map: $scope.map
								});

            					//$scope.markers.push(marker);
							});
						}
					}, function (_error) {
						alert("error logging in " + _error.debug);
					})
			};

		}]);