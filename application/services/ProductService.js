"use strict";

export default class ProductService{

    constructor(
        $http ,
        HOST ,
        GET_PRODUCTS
    ){

        this._$http = $http;
        this._HOST = HOST;
        this._GET_PRODUCTS = GET_PRODUCTS;
    }

    async getProducts(){

        let response = await this._$http.get( `${this._HOST}${this._GET_PRODUCTS}` );

        let products = response.data;

        products.forEach( p => {
            p.amount = 1;
        } );

        return products;

    }

    async getSingleProduct( productId ){

        try{

            let result = await this._$http.get( `${this._HOST}${this._GET_PRODUCTS}` );

            console.log(result);

            return result.data.filter(function (p) {
                return p.ProductID == productId;
            });

        }//try
        catch(ex){

            console.log("Exception: getSingleProduct: " , ex);
            return null;

        }//catch

    }


}