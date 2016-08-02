var app = angular.module('myApp',[]);
app.controller('ctrl',function($scope,$http){
	$scope.list = false;
	$scope.desPanel = false;
	$scope.user = {};
	$scope.res = [];
	$scope.des = {};
	$scope.resClick = function(opt){ // Dropdown click function
		$scope.list = false;
		$scope.user.value = opt;
	},
	$scope.searchSubmit = function(){ // Submit button function
		$http({
			method  : 'POST',
			url     : 'php/process.php',
			data    : $scope.user,
			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		})
		.success(function(data) {
			$scope.des = data;
			$scope.desPanel = true;
		});
	},
	$scope.search = function(){ // Search function
	$scope.list = false;
	$scope.desPanel = false;
		if($scope.user.value != null && $scope.user.value != ""){				
			$http({
				method  : 'POST',
				url     : 'php/search.php',
				data    : $scope.user,
				headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			})
			.success(function(data) {
				$scope.list = true;
				$scope.res = data; 
			});
		}
	};
});
