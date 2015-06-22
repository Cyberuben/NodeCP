var app = angular.module("NodeCP", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/login", {
			templateUrl: "pages/login.html",
			controller: "loginController"
		})
});

app.directive("message", ["$timeout", function ($timeout) {
	return {
		link: function ($scope, element, attributes) {
			$timeout(function () {
				$(".icon.close", element).on("click", function() {
					$(this).closest(".message").transition("scale out", function () {
						$scope.$apply(function () {
							$scope.messages.splice($scope.$index, 1);
						});
					});
				});
			}, 0, false);
		}
	}
}]);

app.controller("loginController", function ($scope) {
	$scope.login = function () {
		// To do: perform login handshake
	};

	$scope.messages = [
		// Example message
		// (all values are optional, and not needed to create the alert)

		// {
		// 	type: "error", // The type of message (should be a valid Semantic UI message type)
		// 	title: "Login failed!", // Bold text at the top of the message
		// 	body: "An invalid username/password combination was entered.", // Regular text below the title
		// 	closable: true, // If true, a close button is added to the message
		// 	icon: "attention" // A name of an icon to add to the message
		// }
	];

	$(".ui.checkbox").checkbox();
});