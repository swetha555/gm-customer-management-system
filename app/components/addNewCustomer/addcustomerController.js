'use strict';
appCustManagement.controller('addcustomerController', function ($scope, $modalInstance, customerListService) {
    $scope.addNewCustomer = function (e) {
        var response = customerListService.addCustomer(e);
        $modalInstance.close(response);
    }
    $scope.cancel = function () {
        $modalInstance.close();
    };
});