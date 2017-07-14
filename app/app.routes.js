'use strict';

appCustManagement.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/app/components/customerList/customerListView.html"
        }).when("/index", {
            templateUrl: "/app/components/customerList/customerListView.html"
        });
        //for clean URLS without # symbol
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
});