
'use strict';
appCustManagement.factory('customerListService', function ($filter, $modal, $localStorage) {
    var customerList = [];
    this.customerList = $localStorage.getCustomerList == undefined ? [] : $localStorage.getCustomerList;
    return {
        getCustomerList: function () {
            this.customerList = $localStorage.getCustomerList == undefined ? [] : $localStorage.getCustomerList;
            return this.customerList
        },
        addCustomer: function (e) {
             if ($filter('filter')(this.customerList, { email: e.email }).length == 0) {
                 e.Id = this.customerList[this.customerList.length - 1] != 'undefined' ? 1 : this.customerList[this.customerList.length - 1].Id + 1 ;
                 this.customerList = $localStorage.getCustomerList == undefined ? [] : $localStorage.getCustomerList;
                 this.customerList.push(e);
                 $localStorage.getCustomerList = this.customerList;
                 return "Customer Added Successfully !";
             }
             else {
                 return "Customer already exists !"
             }
        },
        removeCustomer: function (e) {
            var index = this.customerList.indexOf(e);
            this.customerList.splice(index, 1);
            $localStorage.getCustomerList = this.customerList;
            return true;
        },
        updateCustomer: function (e) {
            $filter('filter')(this.customerList, { id: e.id })[0] = e;
            $localStorage.getCustomerList = this.customerList;
            return "Customer Updated Successfully !";
        }
    }
});