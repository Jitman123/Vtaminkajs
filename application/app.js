"use strict";

//====================CONTROLLERS===========================//
import MainController from './controllers/MainController';

//====================SERVICES==============================//
import LocaleService from './services/LocaleService';
import ProductService from './services/ProductService';
import CartService from './services/CartService';

//====================FILTERS==============================//

//====================DIRECTIVES==============================//
import LangsOptionDirective from './directives/LangsOptionDirective';
import ProductDirective from './directives/ProductDirective';
import AboutUsDirective from "./directives/AboutUsDirective";
import CartDirective from "./directives/CartDirective";
import SingleProductDirective from "./directives/SingleProductDirective";

angular.module('VtaminkaApplication.controllers' , []);
angular.module('VtaminkaApplication.services' , []);
angular.module('VtaminkaApplication.filters' , []);
angular.module('VtaminkaApplication.directives' , []);
angular.module('VtaminkaApplication.constants' , []);

//====================CONTROLLERS DECLARATIONS================================//
angular.module('VtaminkaApplication.controllers')
    .controller( 'MainController' , [ '$scope' , 'LocaleService' , '$translate', MainController ]);

//====================CONSTANTS================================//
angular.module('VtaminkaApplication.constants')
       .constant('HOST' , 'http://localhost:63342/Vtaminka/public/');

angular.module('VtaminkaApplication.constants')
    .constant('GET_LANGS' , 'i18n/langs.json');

//GET_PRODUCTS
angular.module('VtaminkaApplication.constants')
    .constant('GET_PRODUCTS' , 'products/products-list.json');

angular.module('VtaminkaApplication.constants')
    .constant('GET_TRANSLATIONS' , 'i18n/{{LANG}}.json');

//====================SERVICES DECLARATIONS===================//
angular.module('VtaminkaApplication.services')
    .service('LocaleService' , [ '$http', 'HOST' , 'GET_LANGS' , 'GET_TRANSLATIONS' , LocaleService ]);

angular.module('VtaminkaApplication.services')
    .service('ProductService' , [ '$http', 'HOST' , 'GET_PRODUCTS' , ProductService ]);

angular.module('VtaminkaApplication.services')
    .service('CartService' , [ 'localStorageService','ProductService',CartService ]);

//====================DIRECTIVES DECLARATIONS===================//
angular.module('VtaminkaApplication.directives')
    .directive('langsOptionDirective' , [ LangsOptionDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('productDirective' , [ ProductDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('aboutUsDirective' , [ AboutUsDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('cartDirective' , [ CartDirective ]);

angular.module('VtaminkaApplication.directives')
    .directive('singleProductDirective' , [ SingleProductDirective ]);

let app = angular.module('VtaminkaApplication',[
    'angular-loading-bar',
    'LocalStorageModule',
    'VtaminkaApplication.controllers',
    'VtaminkaApplication.filters',
    'VtaminkaApplication.services',
    'VtaminkaApplication.directives',
    'VtaminkaApplication.constants',
    'ngRoute',
    'ui.router',
    'pascalprecht.translate',
]);

app.config( [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    'localStorageServiceProvider' ,
    'cfpLoadingBarProvider',
    '$translateProvider',
    ($stateProvider , $urlRouterProvider , $locationProvider , localStorageServiceProvider , cfpLoadingBarProvider , $translateProvider)=>{

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/home');

    $translateProvider.useStaticFilesLoader({
        'prefix': 'i18n/',
        'suffix': '.json'
    });

    $translateProvider.preferredLanguage('RU');

    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;

    localStorageServiceProvider.setStorageCookie( 7 , '/' );
    localStorageServiceProvider.setStorageCookieDomain('localhost');

    $stateProvider.state('home' , {
        'url': '/home',
        'views':{
            "header":{
                "templateUrl": "templates/header.html",
                controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                    $scope.langs = langs;
                    $scope.cart = CartService.getCart();
                } ]
            },
            "content": {
                'templateUrl': "templates/home/home.html",
                controller: [ '$scope' ,  'CartService' , 'products' , function ($scope , CartService , products){

                    $scope.products = products;
                    $scope.cart = CartService.getCart();

                } ]
            },
            "footer": {
                'templateUrl': "templates/footer.html",

            }
        },
        'resolve': {

            'products': [ 'ProductService' , function ( ProductService ){
                return ProductService.getProducts();
            } ],
            'langs': [ 'LocaleService' , function ( LocaleService ){
                return LocaleService.getLangs();
            }  ]

        }
    });

    $stateProvider.state('about us',{
        'url':'/about_us',
        'views':{

            "header":{
                "templateUrl": "templates/header.html",
                controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                    $scope.langs = langs;
                    $scope.cart = CartService.getCart();
                } ]
            },
            "content": {
                'templateUrl': "templates/about_us.html",
            },
            "footer": {
                'templateUrl': "templates/footer.html",
            }

        },
        'resolve':{

            'langs':[ 'LocaleService' , function( LocaleService ){
                return LocaleService.getLangs();
            } ]

        }

    });

    $stateProvider.state('cart',{
       'url':'/cart',
        'views':{
            "header":{
                "templateUrl": "templates/header.html",
                controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                    $scope.langs = langs;
                    $scope.cart = CartService.getCart();
                } ]
            },
            "content": {
                'templateUrl': "templates/cart.html",
                controller:['$scope','productList' , function ($scope,productList) {
                    $scope.products = productList;
                }]
            },
            "footer": {
                'templateUrl': "templates/footer.html",
            }

        },
        'resolve':{

            'langs':[ 'LocaleService' , function( LocaleService ){
                return LocaleService.getLangs();
            }],
            'productList':['CartService',function (CartService) {
                return CartService.getProducts();
            }]
        }

    });

    $stateProvider.state('singleProduct',{

        'url':'/product/:productID',
        'views':{

            "header":{
                "templateUrl": "templates/header.html",
                controller: [ '$scope' , 'CartService' , 'langs' , function ($scope, CartService , langs ){
                    $scope.langs = langs;
                    $scope.cart = CartService.getCart();
                } ]
            },
            "content": {
                'templateUrl': "templates/product.html",
                controller:['$scope','product' , function ($scope,product) {
                    $scope.product = product;
                }]
            },
            "footer": {
                'templateUrl': "templates/footer.html",
            }

        },
        'resolve':{

            'langs':[ 'LocaleService' , function( LocaleService ){
                return LocaleService.getLangs();
            }],
            'product':['ProductService','$stateParams',function (ProductService,$stateParams) {
                return ProductService.getSingleProduct($stateParams.productID);
            }]
        }

    });

} ] );

app.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

        }
    ]);
