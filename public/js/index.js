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

Kanoevents.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: 'index.html',
				controller: 'mainCtrl'
			});
	}]);
},{"./controllers/mainCtrl.js":2,"./services/refs.js":3}],2:[function(require,module,exports){
angular.module('kanoevents.controllers')
.controller('mainCtrl', ['$scope', '$rootScope', '$location', '$http',
	function($scope, $rootScope, $location, $http) {

		$scope.startMatch = function (player, opponent) {
			var message = player + ' has just started a game of 11 against ' + opponent;
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.pointWon = function (player, opponent) {
			var message = player + ' just won a point over ' + opponent;
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.smashPoint = function (player, opponent) {
			var message = player + ' just won a smash point!';
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.lobPoint = function (player, opponent) {
			var message = player + ' just won a point by lobbing ' + opponent;
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.let = function (player) {
			var message = 'Let!\n' + player + ' has to serve again!';
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.rallyHit = function (player) {
			var message = player + ' had a rally hit!';
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.goodServe = function (player) {
			var message = 'That was a good serve by ' + player;
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.badServe = function (player) {
			var message = 'That was a poor serve by ' + player;
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		function postMessage (payload) {
			// send message to slack channel using the webhook integration
			payload = JSON.stringify(payload);
			var webhookURL 	= 'https://hooks.slack.com/services/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',
				 	request 		= {
						method: 'POST',
						url: webhookURL,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
						data: payload
					};

			$http(request)
			.success(function (data, status, headers, config) {
				console.log(data);
				return true;
			})
			.error(function (data, status, headers, config) {
				console.log('Error: ', data);
				return false;
			});
		}
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
