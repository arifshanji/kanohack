angular.module('kanoevents.controllers')
.controller('mainCtrl', ['$scope', '$rootScope', '$location', '$http',
	function($scope, $rootScope, $location, $http) {
		$scope.updates = [];
		$scope.players = {};

		$scope.startMatch = function (player, opponent) {
			var message = player + ' has just started a game of 11 against ' + opponent;
			var payload = {
				text: message
			};

			initialiseMatch(player, opponent);
			postMessage(payload);
		};

		$scope.pointWon = function (player, opponent) {
			var message = player + ' just won a point over ' + opponent;
			var payload = {
				text: message
			};

			$scope[player].score++;
			postMessage(payload);
		};

		$scope.smashPoint = function (player, opponent) {
			var message = player + ' just won a smash point!';
			var payload = {
				text: message
			};

			$scope[player].score++;
			postMessage(payload);
		};

		$scope.lobPoint = function (player, opponent) {
			var message = player + ' just won a point by lobbing ' + opponent;
			var payload = {
				text: message
			};

			$scope[player].score++;
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

		function initialiseMatch(player, opponent) {
			$scope.players.player1 = player;
			$scope.players.player2 = opponent;
			$scope[player] = { score : 0 };
			$scope[opponent] = { score : 0 };
		}

		function addScoresToPayload(payload) {
			var score1 = $scope[$scope.players.player1].score,
				score2 = $scope[$scope.players.player2].score;
			
			payload.text = "[" + score1 + " - " + score2 + "] " + payload.text;
		}

		function postMessage (payload) {

			// send message to slack channel using the webhook integration
			var webhookURL 	= 'https://hooks.slack.com/services/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',
			 	request 	= {
					method: 'POST',
					url: webhookURL,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				};

			addScoresToPayload(payload);
			request.data = JSON.stringify(payload);

			// update view
			$scope.updates.push( payload.text );

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
