'use strict';
appCustManagement.controller('editcustomerController', function ($scope, customerData,  $modalInstance, customerListService) {
    $scope.customer = angular.copy(customerData);

    $scope.updateCustomer = function (e) {
        customerData = angular.extend(customerData, $scope.customer);
        var response = customerListService.updateCustomer(customerData);
        $modalInstance.close(response);
    };

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
});