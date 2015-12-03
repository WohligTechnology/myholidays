var admin_url = "http://localhost/hotel/index.php/";
//var admin_url = "http://wohlig.co.in/myholidays/admin/index.php/";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    if ($.jStorage.get("userid")) {
        var navigation = [{
            name: "Home",
            classis: "active",
            link: "#/home",
            subnav: []
    }, {
            name: "Profile",
            active: "",
            link: "#/profile",
            classis: "active",
            subnav: []
    }, {
            name: "Pay Now",
            active: "",
            link: "#/pay-now",
            classis: "active",
            subnav: []
    }, {
            name: "Voucher",
            active: "",
            link: "#/voucher",
            classis: "active",
            subnav: []
    }];
    } else {
        var navigation = [{
            name: "Home",
            classis: "active",
            link: "#/home",
            subnav: []
    }];
    }

    return {
        getnav: function () {
            return navigation;
        },
        authenticate: function (callback) {
            return $http.get(admin_url + 'json/authenticate', {}).success(callback);
        }, 
          checkstatus: function (orderid,callback) {
            return $http.get(admin_url + 'json/checkstatus?orderid=' + orderid, {}).success(callback);
        }, 
        logout: function (callback) {
            return $http.get(admin_url + 'json/logout', {}).success(callback);
        },
        createprofile: function (profile, callback) {
            return $http({
                url: admin_url + "json/createprofile",
                method: "POST",
                data: {
                    'name': profile.name,
                    'email': profile.email,
                    'username': profile.username,
                    'gender': profile.gender,
                    'address': profile.address,
                    'contact': profile.contact,
                    'mobile': profile.mobile,
                    'dob': profile.dob,
                    'profession': profile.profession
                }
            }).success(callback);
        },
        createpaymentorder: function (payment, callback) {
            return $http({
                url: admin_url + "json/createpaymentorder",
                method: "POST",
                data: {
                    'user': $.jStorage.get("userid"),
                    'name': payment.name,
                    'email': payment.email,
                    'amount': payment.amount,
                    'billingaddress': payment.billingaddress,
                    'billingcity': payment.billingcity,
                    'billingstate': payment.billingstate,
                    'billingzipcode': payment.billingzipcode,
                    'billingcontact': payment.billingcontact,
                    'billingcountry': payment.billingcountry
                }
            }).success(callback);
        },
        login: function (login, callback) {
            return $http({
                url: admin_url + "json/login",
                method: "POST",
                data: {
                    'voucherno': login.voucherno,
                    'password': login.password
                }
            }).success(callback);
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

    }
});