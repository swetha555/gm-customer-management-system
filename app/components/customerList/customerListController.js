
'use strict';
appCustManagement.controller('customerViewController', function ($scope, $http, $modal, $timeout, customerListService) {
    //Grid Initialization
    $scope.customerGridOptions = {
        data: customerListService.getCustomerList(),
        paginationPageSizes: [10, 20, 40],
        paginationPageSize: 8,
        enableHiding: false,
        enableSorting: false,
        enableScrollbars: false,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 0,
        columnDefs: [
          { field: "email", name: 'Email', width: 300 },
          { field: "firstName", name: 'First Name', width: 150 },
          { field: "lastName", name: 'Last Name', width: 150 },
          { field: "phoneNumber", name: 'Phone Number', width: 150 },
          { field: "address", name: 'Address', width: 280 },
          {
              name: 'Action',
              headerCellClass: 'text-center',
              cellTemplate: '<button class="btn primary" ng-click="grid.appScope.editRow(row)"><i class="fa fa-pencil" aria-hidden="true"></i></button>' +
                            '<button class="btn primary" ng-click="grid.appScope.deleteRow($event,row)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>'
          }
        ]
    };

    //Open Add New Customer Modal-Popup
    $scope.openAddNewCustomerPopup = function () {
        var modalInstance = $modal.open({
            backdrop: 'static',
            templateUrl: 'app/components/addNewCustomer/addcustomerView.html',
            controller: 'addcustomerController',
            size: 'md'
        });
        modalInstance.result.then(function (response) {
            if (response) {
                displayAlert(response);
                $scope.customerGridOptions.data = customerListService.getCustomerList();
            }
        });
    };

    //Open Edit Customer
    $scope.editRow = function (row) {
        var customerData = row.entity;
        var modalInstance = $modal.open({
            backdrop: 'static',
            templateUrl: 'app/components/editCustomer/editcustomerView.html',
            controller: 'editcustomerController',
            size: 'md',
            resolve: {
                customerData: function () {
                    return customerData;
                },
            },
        });
        modalInstance.result.then(function (response) {
            if (response==true) {
                displayAlert(response);
            }
            $scope.customerGridOptions.data = customerListService.getCustomerList();
        });
    };

    //Delete Functionlity
    $scope.deleteRow = function (event, row) {
        if (confirm("Are you sure yout want to delete this record?")) {
            var response = customerListService.removeCustomer(row);
            if (response) {
                $scope.customerGridOptions.data = customerListService.getCustomerList();
                displayAlert("Record deleted successfully..");
            }
        }
    };

    //Alert Message
    function displayAlert(response) {
        $scope.showalert = true;
        $scope.allertMessage = response;
        $timeout(function () {
            $scope.showalert = false;
        }, 3000);
    }
});