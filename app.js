'use strict';
/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
 var dashboardModule = angular.module('dashboardApp', ['ngUpload','ngAnimate', 'ui.bootstrap',
 	'angular-google-gapi','ngRoute']);

dashboardModule.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html'//,
            // controller: 'StudentController'
        })
        .when('/main',{
        	templateUrl: 'main.html'
        })
        .otherwise({
            redirectTo: 'login'
        });
});

 // dashboardModule.constant('CLIENT_ID', 
 // 	'1094966308802-ksdjf0f4h4gblprr663ie3a8hqmcei3o.apps.googleusercontent.com');
 // dashboardModule.constant('SCOPES', ['https://www.googleapis.com/auth/drive.file']);

 var accessToken = null;

 dashboardModule.controller('showFiles', ['$scope','driveUtil','$http','$location' , 
 	function($scope, driveUtil, $http, $location){
 	
 	$scope.isAutherized = false;
 	$scope.value = 0;
 	
 	var SCOPES ='https://www.googleapis.com/auth/drive.file';
 	var CLIENT_ID ='924258763370-vb4af8620mtabrrcsc4o7speg6b5btqn.apps.googleusercontent.com';
 	var API_KEY = 'AIzaSyA5j7sLOg3G7rKqSZWQH1DV0eRtxZUBRoo';

 	$scope.handleAuthClick = function() {

 		gapi.auth.authorize(
 			{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
 			handleAuthResult);
 		return false;
 	};

 	function handleAuthResult(authResult) {

 		if (authResult && !authResult.error) {
 			$scope.isAutherized = true;
 			accessToken = authResult.access_token;

 			console.log('logged in successfully');
 			gapi.client.setApiKey(API_KEY);


 			$scope.$apply();
 			loadDriveApi();
 			$location.path('/main')
 			return true;
 		} else {
			// Show auth UI, allowing the user to initiate authorization by
			// clicking authorize button.
			// authorizeDiv.style.display = 'inline';
			return false;
		}
	}

	  /**
	   * Load Drive API client library.
	   */
	   function loadDriveApi() {
	   	gapi.client.load('drive', 'v2', driveUtil.listFiles);
	   }


	   $scope.Download = function Download(file) {
	   		window.open(file.webContentLink, '_blank').focus();
	   };



	}]);
