(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

kanoevents.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: 'index.html',
				controller: 'mainCtrl'
			});
	}]);
},{"./controllers/mainCtrl.js":2,"./services/refs.js":3}],2:[function(require,module,exports){
angular.module('uberhack.controllers')
.controller('mainCtrl', ['Authentication', '$scope', '$rootScope', '$location',
	function(Authentication, $scope, $rootScope, $location) {

	}
]);

},{}],3:[function(require,module,exports){
angular.module('kanoevents.services')
  .factory('Refs', ['$cookies', '$firebase',
    function($cookies, $firebase) {
      var rootRef = new Firebase($cookies.rootRef || 'https://kano-events.firebaseio.com');     
      
      // define every standard ref used application wide
      return {
        root: rootRef
      };
    }
  ]);

},{}]},{},[1]);
