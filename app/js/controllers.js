'use strict';

/*

var myApp = angular.module('myApp',['ngCart']);

myApp.controller ('myCtrl', ['$scope', '$http', 'ngCart', function($scope, $http, ngCart) {
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);    
}]);

*/


/* Controllers */
var phonecatApp = angular.module('phonecatApp', ['ngRoute' ,'ngAnimate','ngCart']);
/*
var serialAnim = angular.module('serialAnim', ['ngAnimate']);
       serialAnim.controller('mainCtrl', function( $scope ){
            $scope.items = [10,12,13,24,25,26,70,80,83,88,90,95,103,120];

        });
        */
phonecatApp.config(['$routeProvider','$locationProvider',function($routeProvide,$locationProvider){

    $locationProvider.html5Mode({
        enabled: false,
        requireBase:true
    });

    $routeProvide 
        .when('/',{
        templateUrl:'template/home.html',
        controller: 'PhoneListCtrl'
    }).when('/about',{
        templateUrl:'template/about.html',
        controller: 'AboutCtrl'
    }).when('/contact',{
        templateUrl:'template/contact.html',
        controller: 'ContactCtrl'
    }) .when('/basket',{
        templateUrl:'template/basket.html',
        controller: 'BasketCtrl'
    }) 
        .otherwise({
        redirectTo: '/'
    })
        .when('/phones/:phoneId',{
        templateUrl:'template/PhoneDetail.html',
        controller: 'PhoneDetail'
    });
}]);

phonecatApp.filter('checkmark',function(){
    return function(input){
        // return input  ? '\u2713' : '\2778';
        return input  ? '\u2713' : '\u2718';
    }

});

phonecatApp.animation('.phone', function() {

    var animateUp = function(element, className, done) {
        if(className != 'active') {
            return;
        }
        element.css({
            position: 'absolute',
            top: 500,
            left: 0,
            display: 'block'
        });

        jQuery(element).animate({
            top: 0
        }, done);

        return function(cancel) {
            if(cancel) {
                element.stop();
            }
        };
    }

    var animateDown = function(element, className, done) {
        if(className != 'active') {
            return;
        }
        element.css({
            position: 'absolute',
            left: 0,
            top: 0
        });

        $(element).animate({
            top: -500
        }, done);

        return function(cancel) {
            if(cancel) {
                element.stop();
            }
        };
    }

    return {
        addClass: animateUp,
        removeClass: animateDown
    };
});

phonecatApp.controller('PhoneListCtrl',['$scope','$http','ngCart','$location', function($scope, $http, ngCart) {
    $scope.title = 'Телефоны';
    $http.get('phones/phones.json').success(function(data, status, headers, config) {
        console.log('This is Data:',data,'\n\nThis is Status:',status,'\n\nThis is Headers:',headers,'\n\nThis is config:',config);
        $scope.phones = data;
    });
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);  
}]);


phonecatApp.controller('AboutCtrl',['$scope','$http','$location', function($scope, $http) {
}]);
phonecatApp.controller('BasketCtrl',['$scope','$http','$location', function($scope, $http) {
}]);

phonecatApp.controller('ContactCtrl',['$scope','$http','$location', function($scope, $http) {
}]);
phonecatApp.controller('PhoneDetail',['$scope','$http','$location','$routeParams', function($scope, $http,$location,$routeParams) {
    $scope.phoneId = $routeParams.phoneId;
    var url = 'phones/'+$routeParams.phoneId+'.json';
    $http.get(url).success(function(data ) {
        $scope.mainImageUrl = data.images[0];
        $scope.phone = data;
    });
    $scope.setImage = function(imageUrl){
        $scope.mainImageUrl=imageUrl;
    };
}]);
/*

angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById("div1"),['phonecatApp']);
    angular.bootstrap(document.getElementById("div2"),['serialAnim']);
});
*/

