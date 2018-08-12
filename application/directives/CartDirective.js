'use strict'

export default function CartDirective(){

    return{

        restrict:'A',
        scope:{
            products:'='
        },
        templateUrl: 'templates/directives/cart-directive.html',
        controller: ['$scope' , 'CartService','localStorageService' , function ( $scope , CartService,localStorageService ){

            $scope.cart = CartService.getCart();

            $scope.totalAmount = CountAmount();
            $scope.totalPrice = CountTotalPrice();

            $scope.SetAmount = function ( index , amount ){

                $scope.cart[index].amount = Math.abs(amount);
                $scope.products[index].amount = Math.abs(amount);

                $scope.totalAmount = CountAmount();
                $scope.totalPrice  = CountTotalPrice();

                if( $scope.cart[index].amount === 0 ){

                    $scope.cart.splice( index , 1 );
                    $scope.products.splice( index , 1 );

                }//if

                localStorageService.set('cart',$scope.cart);

            };

            $scope.RemoveProduct = function ( index ){

                $scope.cart.splice( index , 1 );
                $scope.products.splice( index , 1 );

                $scope.totalAmount = CountAmount();
                $scope.totalPrice  = CountTotalPrice();

                localStorageService.set('cart',$scope.cart);

            };

            function CountAmount(){

                let total = 0;

                $scope.products.forEach(function (product) {
                    total+=Math.abs(product.amount);
                });

                return total;

            };

            function CountTotalPrice(){

                let total = 0;

                $scope.products.forEach(function (product) {
                    total += Math.abs(product[0].ProductPrice * product.amount);
                });

                return total;

            };



        }]

    }//return

}