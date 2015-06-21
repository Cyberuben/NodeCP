var app = angular.module("NodeCP", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/login", {
			templateUrl: "pages/login.html",
			controller: "loginController"
		})
});

app.controller("loginController", function ($scope) {
	$scope.login = function () {

	};
	
	$(".ui.checkbox").checkbox();
});