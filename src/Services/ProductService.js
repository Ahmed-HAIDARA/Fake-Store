import http from "../http-common";

const getAll = () => {
    return http.get("/products");
};

const get = id => {
  return http.get(`/products/${id}`);
};

const getAllCategories = () => {
    return http.get("/products/categories");
};

const create = data => {
    return http.post("/products", data);
};

const update = (id, data) => {
    return http.put(`/products/${id}`, data);
};

const remove = id => {
    return http.delete(`/products/${id}`);
};

const ProductService = {
    getAll,
    get,
    getAllCategories,
    create,
    update,
    remove,
};

export default ProductService;