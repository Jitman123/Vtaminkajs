"use strict"

export default function SingleProductDirective(){

    return{

        restrict:'A',
        scope:{
            product:'='
        },
        templateUrl: 'templates/directives/single-product-directive.html',
        controller:['$scope','CartService',function ($scope,CartService) {

            $scope.ProductInput = 1;
            $scope.product.amount = $scope.ProductInput;

            $scope.addProductToCart=function (product) {
              CartService.addProduct(product);
            };

            $scope.OnInputChange=function (input) {

                if (!input.match(/^\d+$/) || input <= 0) {
                    $scope.ProductInput = 1;
                }//if

                $scope.product.amount = input;

            };

        }]

    }


}
