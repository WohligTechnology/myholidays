// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    // for http request with session
    $httpProvider.defaults.withCredentials = true;

    //Turn the spinner on or off
    //    cfpLoadingBarProvider.includeSpinner = false;

    $stateProvider

        .state('home', {
            url: "/home",
            templateUrl: "views/template.html",
            controller: 'HomeCtrl'
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "views/template.html",
            controller: 'ProfileCtrl'
        })
        .state('pay-now', {
            url: "/pay-now",
            templateUrl: "views/template.html",
            controller: 'PayNowCtrl'
        })

    .state('feature', {
        url: "/feature",
        templateUrl: "views/template.html",
        controller: 'FeatureCtrl'
    })

    .state('infinite', {
        url: "/infinite",
        templateUrl: "views/template.html",
        controller: 'InfiniteCtrl'
    })

    .state('voucher', {
        url: "/voucher",
        templateUrl: "views/template.html",
        controller: 'VoucherCtrl'
    })

    $urlRouterProvider.otherwise("/home");

});


firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});


firstapp.directive('masonry', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        templateUrl: "views/directive/voucher.html",
        link: function ($scope, element, attr) {
            var $element = $(element);
            console.log(attr);
            setTimeout(function () {
                $element.children(".grid").children(".grid-item").children("a").children("img").load(function () {
                    $scope[attr.getMasonry].masonry("reloadItems");
                    $scope[attr.getMasonry].masonry("layout");
                });
                $scope[attr.getMasonry] = $('.grid').masonry({
                    itemSelector: '.grid-item',
                    columnWidth: 1,
                    transitionDuration: '0.8s'
                });
                $(".fancybox-thumb").fancybox({
                    prevEffect: 'none',
                    nextEffect: 'none',
                    helpers: {
                        title: {
                            type: 'outside'
                        },
                        thumbs: {
                            width: 50,
                            height: 50
                        }
                    }
                });

            }, 100);
        }
    }
});


firstapp.directive("scroll", function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset >= 100) {
                element.addClass('min');
            } else {
                element.removeClass('min');
            }
        });
    };
});
