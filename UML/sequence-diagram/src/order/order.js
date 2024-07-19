"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var Order = /** @class */ (function () {
    function Order(clientName, shoppingCart) {
        this.clientName = clientName;
        this.shoppingCart = shoppingCart;
    }
    Order.prototype.showOrder = function () {
        var selectProducts = this.shoppingCart.getSelectedProducts();
        var total = this.shoppingCart.calculateTotal();
        console.log("\uACE0\uAC1D \uC774\uB984: ".concat(this.clientName));
        for (var _i = 0, selectProducts_1 = selectProducts; _i < selectProducts_1.length; _i++) {
            var product = selectProducts_1[_i];
            console.log("\uC0C1\uD488: ".concat(product.name, ", \uAC00\uACA9: ").concat(product.price));
        }
        console.log("\uD569\uACC4: ".concat(total));
    };
    return Order;
}());
exports.Order = Order;
