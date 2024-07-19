"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.selectedProducts = [];
    }
    ShoppingCart.prototype.addProduct = function (product) {
        this.selectedProducts.push(product);
    };
    ShoppingCart.prototype.getSelectedProducts = function () {
        return this.selectedProducts;
    };
    ShoppingCart.prototype.calculateTotal = function () {
        var total = 0;
        for (var _i = 0, _a = this.selectedProducts; _i < _a.length; _i++) {
            var product = _a[_i];
            total += product.price;
        }
        return total;
    };
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
