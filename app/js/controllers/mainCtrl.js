angular.module('kanoevents.controllers')
.controller('mainCtrl', ['$scope', '$rootScope', '$location', '$http',
	function($scope, $rootScope, $location, $http) {
		$scope.updates = [];
		$scope.player1 = {
			name: undefined,
			score: 0
		};

		$scope.player2 = {
			name: undefined,
			score: 0
		};

		$scope.startMatch = function (player, opponent) {
			if (!player.name || !opponent.name) {
				alert('Please enter the name of the player before proceeding');
				return false;
			}
			else {
				var message = player.name + ' has just started a game of 11 against ' + opponent.name;
				var payload = {
					text: message
				};

				postMessage(payload);
			}
		};

		$scope.pointWon = function (player, opponent) {
			var message = player.name + ' just won a point over ' + opponent.name;
			var payload = {
				text: message
			};

			addPoint(player, opponent);
			postMessage(payload);
		};

		$scope.smashPoint = function (player, opponent) {
			var message = player.name + ' just won a smash point!';
			var payload = {
				text: message
			};

			addPoint(player, opponent);
			postMessage(payload);
		};

		$scope.lobPoint = function (player, opponent) {
			var message = player.name + ' just won a point by lobbing ' + opponent.name;
			var payload = {
				text: message
			};

			addPoint(player, opponent);
			postMessage(payload);
		};

		$scope.let = function (player) {
			var message = 'Let!\n' + player.name + ' has to serve again!';
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.rallyHit = function (player) {
			var message = player.name + ' had a rally hit!';
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.goodServe = function (player) {
			var message = 'That was a good serve by ' + player.name;
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		$scope.badServe = function (player) {
			var message = 'That was a poor serve by ' + player.name;
			var payload = {
				text: message
			};

			postMessage(payload);
		};

		function addScoresToPayload(payload) {
			var score1 = $scope.player1.score,
				score2 = $scope.player2.score;
			
			payload.text = "`[" + score1 + " - " + score2 + "]` " + payload.text;
		}

		function addPoint (player, opponent) {
			player.score += 1;
			getWinner(player, opponent);
		}

		// show the total scores for the match
		function getWinner (player, opponent) {
			var message;

			if (player.score === 11) {
				message = player.name + ' has just won the game against ' + opponent.name;
			}

			else if (opponent.score === 11) {
				message = opponent.name + ' has just won the game against ' + player.name;
			}

			var payload = {
				text: message
			};

			if (message) {
				$scope.match = false;
				postMessage(payload);
				alert(message);
			}
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
