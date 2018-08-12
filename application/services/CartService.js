"use strict";


export default class CartService{


    constructor(localStorageService,ProductService){

        if(localStorageService.get('cart')){
            this.cart = localStorageService.get('cart');
        }//if
        else{
            this.cart = [];
        }//else

        this.localStorageService = localStorageService;
        this._productService = ProductService;

    }//constructor

    getCart(){
        return this.cart;
    }//getCart

    addProduct( product ){

        product.isInCart = true;

        this.cart.push( product );

        this.localStorageService.set( 'cart' , this.cart );

    }//addProduct

    async getProducts () {

        let products = [];

        for ( let i = 0 ; i < this.cart.length ; i++  ){

            let cartProduct = this.cart[i];
            let product = await this._productService.getSingleProduct( cartProduct.ProductID || cartProduct[0].ProductID);
            product.amount = cartProduct.amount;

            products.push( product );

        }//for i

        console.log(products);

        return products;

    }


}