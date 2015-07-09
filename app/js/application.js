// defining modules
angular.module('kanoevents.controllers', []);
angular.module('kanoevents.services', []);

/* loading services */
require('./services/refs.js');


// loading controller
require('./controllers/mainCtrl.js');

window.Kanoevents = angular.module('Kanoevents', [
	'ngRoute',
	'ngCookies',
	'firebase',
	'kanoevents.controllers',
	'kanoevents.services'
]);

Kanoevents.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: 'index.html',
				controller: 'mainCtrl'
			});
	}]);