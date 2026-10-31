import { request } from '@/utility/helper/request';

const searchData = async (query) => {
  const res = await request(`product/search?query=${query}`, 'get');
  return res;
};

const getData = async () => {
  const res = await request('product', 'get');
  return res;
};

const createData = async (data) => {
  const res = await request('product', 'post', data);
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`product/${id}`, 'post', data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`product/${id}`, 'delete');
  return res;
};

const getBrand = async () => {
  const res = await request('brand', 'get');
  return res;
};

const getCategory = async () => {
  const res = await request('category', 'get');
  return res;
};

export {
  searchData,
  getData,
  createData,
  updateData,
  deleteData,
  getBrand,
  getCategory,
};
