angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngDialog', 'ngSanitize','base64'])

.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngDialog, $location, $window) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showLoginBtn = true;
        if ($.jStorage.get("userid"))
            $scope.showLoginBtn = false;
        $scope.showLogin = function () {
            ngDialog.open({
                template: 'views/content/login.html'
            });
        };
        //Logout function
        var logoutcallback=function(data,status){
        console.log(data);
            $.jStorage.flush();
            $window.location.reload();
        }
        $scope.logout=function(){
        NavigationService.logout(logoutcallback);
        }
        // login function
        var authenticatecallback = function (data, status) {
            $.jStorage.set("userid", data.id);
            $scope.loginid = $.jStorage.get("userid");
            $scope.navigation = NavigationService.getnav();
            $window.location.reload();
        }
        var logincallback = function (data, status) {
            console.log(data);
            if (data == "true") {
                $scope.closeThisDialog();
                NavigationService.authenticate(authenticatecallback);
            } else if (data == "false") {
                ngDialog.open({
                    template: 'views/content/login.html'
                });
            }
        }
        $scope.login = function (login) {
            $scope.allvalidation = [{
                field: $scope.login.voucherno,
                validation: ""
            }, {
                field: $scope.login.password,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                NavigationService.login(login, logincallback);
            } else {
                console.log("Invalid");
            }
        }
    })
    .controller('ProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngDialog) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("profile");
        $scope.menutitle = NavigationService.makeactive("Profile");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        // create profile function by pooja

        $scope.profile = {};
        var profilecallback = function (data, status) {
            console.log(data);
            if (data == 1) {
                ngDialog.open({
                    template: 'views/content/profilesubmit.html'
                });
                 $scope.profile = {};
            } else {
                console.log("false");
                  ngDialog.open({
                    template: 'views/content/tryagain.html'
                });
            }
        }
        $scope.createprofile = function (profile) {

            $scope.allvalidation = [{
                field: $scope.profile.name,
                validation: ""
            }, {
                field: $scope.profile.email,
                validation: ""
            }, {
                field: $scope.profile.username,
                validation: ""
            }, {
                field: $scope.profile.gender,
                validation: ""
            }, {
                field: $scope.profile.dob,
                validation: ""
            }, {
                field: $scope.profile.address,
                validation: ""
            }, {
                field: $scope.profile.contact,
                validation: ""
            }, {
                field: $scope.profile.profession,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                NavigationService.createprofile(profile, profilecallback);
            } else {
                console.log("Invalid");
            }

        }
    })
    .controller('PayNowCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngDialog,$interval,$base64) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("pay-now");
        $scope.menutitle = NavigationService.makeactive("Pay Now");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        // payment
        $scope.payment = {};
      $scope.encodedurl = $base64.encode('http://localhost/myholidays/#/failure');
        var paymentcallback = function (data, status) {
             $scope.orderid=data;
                $scope.succurl = "http://localhost/hotel/index.php/json/payumoneysuccess1?orderid=" + data
            if (data==0) {
               console.log("false");
                  ngDialog.open({
                    template: 'views/content/tryagain.html'
                });
            } else {
//                  ref = window.open("http://localhost/hotel/payumoney/paymentgateway.php?orderid=" +  $scope.orderid + "&firstname=" + $scope.payment.name + "&email=" + $scope.payment.email + "&amount=" + $scope.payment.amount + "&phone="+ $scope.payment.billingcontact+"&productinfo=myholidays&surl=http://localhost/hotel/index.php/json/payumoneysuccess1?orderid=" + data + "&furl=wohlig.com", '_blank', 'location=no'); 
//                ref = window.open("http://wohlig.co.in/hotel/payumoney/paymentgateway.php?orderid=" +  $scope.orderid + "&name=" + $scope.payment.name + "&email=" + $scope.payment.email + "&amount=" + $scope.payment.amount + "&billingaddress=" + $scope.payment.billingaddress + "&billingcity=" + $scope.payment.billingcity + "&billingcontact="+ $scope.payment.billingcontact+ "&billingcountry="+$scope.payment.billingcountry+"&billingstate="+$scope.payment.billingstate+"&billingzipcode="+$scope.payment.billingzipcode+"&surl=http://wohlig.co.in/hotel/index.php/json/payumoneysuccess1?orderid=" + data + "&furl=wohlig.com", '_blank', 'location=no'); 
                ref = window.open("http://localhost/hotel/payumoney/paymentgateway.php?orderid=" +  $scope.orderid + "&firstname=" + $scope.payment.name + "&email=" + $scope.payment.email + "&amount=" + $scope.payment.amount + "&address1=" + $scope.payment.billingaddress + "&city=" + $scope.payment.billingcity + "&phone="+ $scope.payment.billingcontact+ "&country="+$scope.payment.billingcountry+"&state="+$scope.payment.billingstate+"&zipcode="+$scope.payment.billingzipcode+"&productinfo=myholidays&surl=http://localhost/hotel/index.php/json/payumoneysuccess1?orderid=" + data + "&furl="+$scope.encodedurl, '_blank', 'location=no');
//            stopinterval = $interval(callAtInterval, 2000);
                 $scope.payment = {};
            }
        }
        $scope.paymentform = function (payment) {
            $scope.allvalidation = [{
                field: $scope.payment.name,
                validation: ""
            }, {
                field: $scope.payment.email,
                validation: ""
            }, {
                field: $scope.payment.amount,
                validation: ""
            }, {
                field: $scope.payment.billingaddress,
                validation: ""
            }, {
                field: $scope.payment.billingcity,
                validation: ""
            }, {
                field: $scope.payment.billingcontact,
                validation: ""
            }, {
                field: $scope.payment.billingcountry,
                validation: ""
            }, {
                field: $scope.payment.billingstate,
                validation: ""
            }, {
                field: $scope.payment.billingzipcode,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                $scope.payment = payment;
                NavigationService.createpaymentorder($scope.payment, paymentcallback);
            } else {
                console.log("Invalid");
            }

        }
    })
.controller('thankyouCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("thankyoupage");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})
    .controller('failureCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("failurepage");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})


.controller('headerctrl', function ($scope, TemplateService) {
    $scope.template = TemplateService;
})

.controller('VoucherCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("voucher");
    $scope.menutitle = NavigationService.makeactive("Voucher");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.items = [{
        "id": 0,
        "picture": "img/voucher/1.jpg",

        }, {
        "id": 1,
        "picture": "img/voucher/2.jpg",

        }, {
        "id": 2,
        "picture": "img/voucher/3.jpg",
        }, {
        "id": 3,
        "picture": "img/voucher/4.jpg",
        }, {
        "id": 4,
        "picture": "img/voucher/5.jpg",
        }, {
        "id": 5,
        "picture": "img/voucher/6.jpg",
        }, {
        "id": 6,
        "picture": "img/voucher/7.jpg",
        }, {
        "id": 7,
        "picture": "img/voucher/8.jpg",
        }, {
        "id": 8,
        "picture": "img/voucher/9.jpg",
        }, {
        "id": 9,
        "picture": "img/voucher/10.jpg",
        }, {
        "id": 10,
        "picture": "img/voucher/11.jpg",
        }, {
        "id": 11,
        "picture": "img/voucher/12.jpg",
        }, {
        "id": 12,
        "picture": "img/voucher/13.jpg",
        }, {
        "id": 13,
        "picture": "img/voucher/14.jpg",
        }, {
        "id": 14,
        "picture": "img/voucher/15.jpg",
        }, {
        "id": 15,
        "picture": "img/voucher/16.jpg",
        }, {
        "id": 16,
        "picture": "img/voucher/17.jpg",
        }, {
        "id": 17,
        "picture": "img/voucher/18.jpg",
        }, {
        "id": 18,
        "picture": "img/voucher/19.jpg",
        }, {
        "id": 19,
        "picture": "img/voucher/20.jpg",
        }, {
        "id": 20,
        "picture": "img/voucher/21.jpg",
        }, {
        "id": 21,
        "picture": "img/voucher/22.jpg",
        }, {
        "id": 22,
        "picture": "img/voucher/23.jpg",
        }, {
        "id": 23,
        "picture": "img/voucher/24.jpg",
        }, {
        "id": 24,
        "picture": "img/voucher/25.jpg",
        }, {
        "id": 25,
        "picture": "img/voucher/26.jpg",
        }, {
        "id": 26,
        "picture": "img/voucher/27.jpg",
        }, {
        "id": 27,
        "picture": "img/voucher/28.jpg",
        }, {
        "id": 28,
        "picture": "img/voucher/29.jpg",
        }, {
        "id": 29,
        "picture": "img/voucher/30.jpg",
        }];

    $scope.changefilter = function (filter) {
        $scope.nameFilter = filter;
        setTimeout(function () {
            $scope.voucher.masonry("reloadItems");
            $scope.voucher.masonry("layout");
        }, 10);


    };
});