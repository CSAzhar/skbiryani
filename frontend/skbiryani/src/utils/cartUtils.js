export const calculateCartTotals = (cartItems, foodQuantity) => {

    const subTotal = cartItems.reduce((acc, food) => acc + food.price * foodQuantity[food.id], 0);
    const shippingCharge = subTotal === 0 ? 0 : 10;
    const tax = subTotal * 0.05;
    const total = subTotal + shippingCharge + tax;

    return {subTotal, shippingCharge, tax, total}


}