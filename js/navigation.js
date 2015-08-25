var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
    var navigation = [{
        name: "Home",
        classis: "active",
        link: "#/home",
        subnav: [
//            {
//            name: "Subnav1",
//            classis: "active",
//            link: "#/home"
//        }, {
//            name: "Subnav2",
//            classis: "active",
//            link: "#/home"
//        }, {
//            name: "Subnav3",
//            classis: "active",
//            link: "#/home"
//        }
        ]
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

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
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