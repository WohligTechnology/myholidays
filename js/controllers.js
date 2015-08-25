angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'infinite-scroll', 'toaster', 'ngAnimate', 'ngAutocomplete', 'ngTagsInput', 'ngDialog', 'ngSocial', 'valdr', 'ngSanitize', 'ui.select', 'angular-flexslider'])

.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngDialog) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showLogin = function () {
            ngDialog.open({
                template: 'views/content/login.html'
            });
        };
    })
    .controller('ProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngDialog) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("profile");
        $scope.menutitle = NavigationService.makeactive("Profile");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('PayNowCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngDialog) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("pay-now");
        $scope.menutitle = NavigationService.makeactive("Pay Now");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

.controller('FeatureCtrl', function ($scope, TemplateService, NavigationService, $timeout, toaster, ngDialog, valdr) {
    $scope.template = TemplateService.changecontent("feature");
    $scope.menutitle = NavigationService.makeactive("Features");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    //Angular Loader Example
    //Start loader
    //    $scope.showLoader = function() {
    //        cfpLoadingBar.start();
    //    }
    //Complete loader
    //    $scope.hideLoader = function() {
    //        cfpLoadingBar.complete();
    //    }

    //Angular toaster
    $scope.showToaster = function () {
        toaster.pop({
            type: 'success',
            title: 'Success!',
            body: 'Huraaay!',
            showCloseButton: true
        });
    };

    //Tags input
    $scope.tags = [{
        text: 'Chintan'
    }, {
        text: 'Saloni'
    }, {
        text: 'Sohan'
    }, {
        text: 'Mahesh'
    }, {
        text: 'Jagruti'
    }];

    //ngDialog
    $scope.showPopup = function () {
        ngDialog.open({
            template: 'demopop'
        });
    };

    //Valdr
    valdr.addConstraints({
        'Person': {
            'firstName': {
                'size': {
                    'min': 3,
                    'max': 20,
                    'message': 'First name is required to be between 3 and 20 characters.'
                },
                'required': {
                    'message': 'First name is required.'
                }
            }
        }
    });

    //Colours for ui-select
    $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

    //MomentJS
    $scope.today = new Date();
    $scope.dateformat = "medium";

    /*reCaptcha*/
    $scope.response = null;
    $scope.widgetId = null;

    $scope.setResponse = function (response) {
        $scope.response = response;
        console.log($scope.response);
    };
    $scope.setWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function () {
        console.info('Captcha expired. Resetting response object');
        $scope.response = null;
    };
    $scope.submit = function () {
        var valid;
        /**
         * SERVER SIDE VALIDATION
         *
         * You need to implement your server side validation here.
         * Send the reCaptcha response to the server and use some of the server side APIs to validate it
         * See https://developers.google.com/recaptcha/docs/verify
         */
        console.log('sending the captcha response to the server', $scope.response);
        //        if (valid) {
        //            console.log('Success');
        //        } else {
        //            console.log('Failed validation');
        //            // In case of a failed validation you need to reload the captcha
        //            // because each response can be checked just once
        //            vcRecaptchaService.reload($scope.widgetId);
        //        }
    };

})

.controller('InfiniteCtrl', function ($scope, TemplateService, NavigationService) {
    $scope.template = TemplateService.changecontent("infinite");
    $scope.menutitle = NavigationService.makeactive("Infinite Scroll");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    //Infinite scroll
    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.loadMore = function () {
        var last = $scope.images[$scope.images.length - 1];
        for (var i = 1; i <= 8; i++) {
            $scope.images.push(last + i);
        }
    };
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
