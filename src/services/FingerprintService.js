import http from "../http - common";

const getAll = () => {
    return http.get("/fingerprint");
};

const get = id => {
    return http.get(`/fingerprint/${id}`);
};

const create = data => {
    return http.post(`/fingerprint`,data);
};

const update = (id, data) => {
    return http.put(`/fingerprint/${id}`, data);
};

const remove = id => {
    return http.delete(`/fingerprint/${id}`);
};

const removeAll = () => {
    return http.delete('/fingerprint');
};

const findById = id => {
    return http.get(`/fingerprint?id=${id}`);
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findById
}