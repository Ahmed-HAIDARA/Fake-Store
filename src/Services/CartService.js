import http from "../http-common";

const getAll = () => {
    return http.get("/carts");
};

const CartService = {
    getAll,
};

export default CartService;